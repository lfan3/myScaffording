var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import arg from 'arg';
import inquirer from 'inquirer';
import * as chalk from 'chalk';
import { createProject } from "./main";
import fs from 'fs';
function parseArgumentsIntoOptions(rawArgs) {
    var _a, _b;
    var args = arg({
        "--help": Boolean,
        "--port": Boolean,
        "-h": "--help",
        "-p": "--port"
    }, {
        argv: rawArgs.slice(2),
    });
    if (!rawArgs.slice(2).length) {
        console.error('%s at least one argument. tape fe --help/-h for more info', chalk.red.bold('No Argument'));
        process.exit(1);
    }
    return {
        help: (_a = args["--help"]) !== null && _a !== void 0 ? _a : false,
        port: (_b = args["--port"]) !== null && _b !== void 0 ? _b : false,
        command: args._[0],
    };
}
function promptQestionsForOptions(options) {
    return __awaiter(this, void 0, void 0, function () {
        var questions, defaultTemplate, defaultName, fe, unkonwnanswers, answers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    questions = [];
                    defaultTemplate = "base";
                    defaultName = "fe-app";
                    if (options.command.toLowerCase() === "init") {
                        fe = fs.readFileSync(__dirname + '/asciife', 'utf-8');
                        console.log('\x1b[33m%s\x1b[0m', fe); //print ascii "fe" in the terminal
                        questions.push({
                            type: 'list',
                            name: 'template',
                            message: 'templace',
                            choices: ["base", "other"],
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
                    });
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
                    if (options.port) {
                        questions.push({
                            type: 'input',
                            name: 'port',
                            message: 'The port number',
                        });
                    }
                    return [4 /*yield*/, inquirer.prompt(questions)];
                case 1:
                    unkonwnanswers = _a.sent();
                    answers = unkonwnanswers;
                    return [2 /*return*/, __assign(__assign({}, options), { port: options.port ? answers.port : 8001, git: true, runInstall: true, directory: answers.directory || defaultName, project: answers.project || defaultName, template: answers.template || defaultTemplate })];
            }
        });
    });
}
export function cli(args) {
    return __awaiter(this, void 0, void 0, function () {
        var rawOptions, options;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rawOptions = parseArgumentsIntoOptions(args);
                    return [4 /*yield*/, promptQestionsForOptions(rawOptions)];
                case 1:
                    options = _a.sent();
                    return [4 /*yield*/, createProject(options)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
