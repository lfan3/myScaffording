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
import * as chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
//import execa  from 'execa';
import Listr from 'listr';
import { projectInstall } from 'pkg-install';
import cp from "child_process";
var access = promisify(fs.access);
var copy = promisify(ncp);
var execa = promisify(cp.exec);
function initGit(options) {
    return __awaiter(this, void 0, void 0, function () {
        var result, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, execa('git init', {
                            cwd: "./" + options.directory
                        })];
                case 1:
                    result = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.error(err_1.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function copyTemplateFiles(templateDirectory, targetDirectory) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, copy(templateDirectory, targetDirectory)];
        });
    });
}
function createDirectory(options) {
    return __awaiter(this, void 0, void 0, function () {
        var targetDirectory, template, templateDirectory;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    targetDirectory = options.directory, template = options.template;
                    templateDirectory = path.resolve(__dirname, "../templates/" + template);
                    console.log(options, "createDir");
                    if (!fs.existsSync(targetDirectory)) {
                        fs.mkdirSync(targetDirectory);
                    }
                    else {
                        console.error('%s project\'s name exists already, please change another name. 有重名的项目，请换一个名字', chalk.red.bold('existing name'));
                        process.exit(1);
                    }
                    return [4 /*yield*/, copyTemplateFiles(templateDirectory, targetDirectory)];
                case 1:
                    _a.sent();
                    if (options.port !== 8001) {
                        replaceInFile("8001", options.port.toString(), path.join(targetDirectory, "webpack.config.js"));
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function replaceInFile(target, replace, path) {
    fs.readFile(path, 'utf-8', function (err, data) {
        if (err)
            throw console.error(err);
        var result = data.replace(target, replace);
        fs.writeFile(path, result, 'utf-8', function (err) {
            if (err)
                throw console.error(err);
        });
    });
}
export function createProject(options) {
    return __awaiter(this, void 0, void 0, function () {
        var currentFileUrl, pathName, templateDir, targetDirectory, template, tasks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = __assign(__assign({}, options), { targetDirectory: options.directory || options.targetDirectory || process.cwd() //root directory:create-fe-app
                     });
                    currentFileUrl = import.meta.url;
                    pathName = new URL(currentFileUrl).pathname;
                    templateDir = path.resolve(pathName, "../../templates", options.template.toLowerCase());
                    options.templateDirectory = templateDir;
                    targetDirectory = options.targetDirectory, template = options.template;
                    tasks = new Listr([
                        {
                            title: 'create directory and files',
                            task: function () { return createDirectory(options); },
                        },
                        {
                            title: 'Init Git',
                            task: function () { return initGit(options); },
                            enabled: function () { return options.git; }
                        },
                        {
                            title: 'Install npm dependencies',
                            //todo:handle this error
                            task: function () { return projectInstall({
                                cwd: "./" + targetDirectory,
                                prefer: "tnpm"
                            }); },
                        },
                    ]);
                    return [4 /*yield*/, tasks.run()];
                case 1:
                    _a.sent();
                    console.log('%s project ready', chalk.green.bold('Done'));
                    return [2 /*return*/, true];
            }
        });
    });
}
