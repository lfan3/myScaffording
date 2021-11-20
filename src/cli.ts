import arg from 'arg';
import inquirer from 'inquirer';
import * as chalk from 'chalk';
import { createProject} from "./main";
import { argResult, optionResult, question} from "./types";
import fs from 'fs';
function parseArgumentsIntoOptions(rawArgs: string[]): argResult {
    const args = arg({
        "--help": Boolean,
        "--port": Boolean,
        "-h": "--help",
        "-p": "--port"
    },
    {
        argv: rawArgs.slice(2),
    })
    if (!rawArgs.slice(2).length) {
        console.error('%s at least one argument. tape fe --help/-h for more info', chalk.red.bold('No Argument'));
        process.exit(1);
    }
    return {
        help: args["--help"] ?? false,
        port: args["--port"] ?? false,
        command: args._[0],
    }
}

async function promptQestionsForOptions(options: argResult) {
    const questions: Partial<question>[] = [];
    const defaultTemplate = "base";
    const defaultName = "fe-app";
    if (options.command.toLowerCase() === "init") {
        const fe = fs.readFileSync(__dirname + '/asciife', 'utf-8');
        console.log('\x1b[33m%s\x1b[0m', fe); //print ascii "fe" in the terminal
        questions.push({
            type: 'list',
            name: 'template',
            message: 'templace',
            choices: ["base","other"],
            default: defaultTemplate,
        });
        questions.push({
            type: 'input',
            name: 'directory',
            message: 'The directory name',
            default: defaultName,
        });
    }
    questions.push({
        type: 'input',
        name: 'project',
        message: 'The project name',
        default: defaultName,
    })

  
/*     if(answers.directory !== defaultName ){
        const defaultProjectName = answers.directory;
        const questions = [];
        questions.push({
            type: 'input',
            name: 'project',
            message: 'The project name',
            default: defaultProjectName,
        })
        const unkonwnanswers = await inquirer.prompt(questions);
        const newanswers = unkonwnanswers as optionResult; 
        console.log(newanswers, "new answer");
    } */
    
    if(options.port){
        questions.push({
            type: 'input',
            name: 'port',
            message: 'The port number',
        })
    }
    const unkonwnanswers = await inquirer.prompt(questions);
    const answers = unkonwnanswers as optionResult;
    return {
        ...options,
        port: options.port ? answers.port : 8001,
        git: true,
        runInstall: true,
        //directory: answers.directory || defaultName,
        targetDirectory: answers.directory || defaultName,
        project: answers.project || defaultName,
        template: answers.template || defaultTemplate
    }
}

export async function cli(args: string[]) {
    const rawOptions = parseArgumentsIntoOptions(args);
    const options = await promptQestionsForOptions(rawOptions);
    await createProject(options);
}