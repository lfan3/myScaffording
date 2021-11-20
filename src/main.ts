import * as chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
//import execa  from 'execa';
import Listr from 'listr';
import { projectInstall } from 'pkg-install';
import { argResult, optionResult} from "./types";
import cp from "child_process";

const access = promisify(fs.access);
const copy = promisify(ncp);
const execa = promisify(cp.exec);

async function initGit(options:any){
    try {
        const result = await execa('git init', {
            cwd: `./${options.directory}`
        });
    } catch(err:any) {
        console.error(err.message);
    }


    return;
}
async function copyTemplateFiles(templateDirectory:string, targetDirectory:string){
    return copy(templateDirectory, targetDirectory);
}

async function createDirectory(options:optionResult){
    const {directory:targetDirectory, template} = options;
    const templateDirectory = path.resolve(__dirname, `../templates/${template}`);
    console.log(options, "createDir")
    if(!fs.existsSync(targetDirectory)){
        fs.mkdirSync(targetDirectory)
    }else{
        console.error('%s project\'s name exists already, please change another name. 有重名的项目，请换一个名字', chalk.red.bold('existing name'));
        process.exit(1);
    }
    await copyTemplateFiles(templateDirectory, targetDirectory);
    if(options.port !== 8001){
        replaceInFile("8001", options.port.toString(), path.join(targetDirectory, "webpack.config.js"));
    }
    return;
}

function replaceInFile(target:string, replace:string, path:string){
    fs.readFile(path,'utf-8', (err, data)=>{
        if(err) throw console.error(err);
        var result = data.replace(target, replace);
        fs.writeFile(path, result, 'utf-8', (err)=>{
            if(err) throw console.error(err);
        })
    })
}

export async function createProject(options:any){
    options = {
        ...options,
        targetDirectory: options.targetDirectory || process.cwd() //root directory:create-fe-app
    }
    const currentFileUrl = import.meta.url;
    const pathName = new URL(currentFileUrl).pathname; 
    const templateDir = path.resolve(
        pathName,
        "../../templates",
        options.template.toLowerCase()
    )
    options.templateDirectory = templateDir;
    const {targetDirectory, template} = options;
    const tasks = new Listr([
        {
            title: 'create directory and files',
            task: ()=>createDirectory(options),
        },
        {
            title: 'Init Git',
            task: ()=>initGit(options),
            enabled: () => options.git
        },
        {
            title: 'Install npm dependencies',
            //todo:handle this error
            task: ()=>projectInstall({
                cwd:`./${targetDirectory}`,
                prefer: "tnpm"
            }),
        }, 
    ])
    await tasks.run();
    console.log('%s project ready', chalk.green.bold('Done'));
    return true;
}