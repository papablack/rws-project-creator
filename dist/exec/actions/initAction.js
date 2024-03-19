"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("@rws-framework/console");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
const uuid_1 = require("uuid");
const configure_1 = require("../helper/configure");
const ask_1 = require("../helper/ask");
const console_vis_1 = require("@rws-framework/console-vis");
const packageExecDir = path_1.default.resolve(__dirname);
const { runCommand } = console_1.rwsShell;
const { copyFiles } = console_1.rwsFS;
async function default_1(output) {
    const args = output.rawArgs || [];
    if (!args.length) {
        throw new Error('Project name needed');
    }
    const projectName = args[0];
    let targetDir = process.cwd();
    if (args.length > 1) {
        targetDir = args[1];
    }
    targetDir += `/${projectName}`;
    if (fs_1.default.existsSync(targetDir)) {
        console.log(chalk_1.default.red(`Directory ${targetDir} already exists.`));
        return;
    }
    const copyset = {};
    copyset[targetDir] = [path_1.default.resolve(console_1.rwsPath.findPackageDir(__dirname) + '/sample')];
    copyFiles(copyset);
    const opts = {
        projectName,
        pubUrl: '/',
        pubDirAbs: path_1.default.resolve(targetDir, 'frontend', 'public'),
        buildDir: path_1.default.resolve(targetDir, 'frontend', 'public', 'js'),
        domain: 'localhost',
        httpPort: 1337,
        wsPort: 1338,
        isSSL: 0,
        hasAuth: 0,
        partedPrefix: 'rws',
        secretKey: (0, uuid_1.v4)(),
        frontRouting: 1,
        serverFilePrefix: 'rws',
        protocol: 'http'
    };
    const advConfig = await console_vis_1.rwsCliVisHelpers.cli.select('advConfig', 'What install mode do you wish to pick?', [
        { name: 'default', value: false, message: 'Default mode.' },
        { name: 'advanced', value: true, message: 'Advanced mode.' }
    ]);
    if (advConfig) {
        console.log(chalk_1.default.yellow('Advanced configuration procedure started. Answer following questions: \n'));
        await (0, ask_1.askQuestions)(opts);
    }
    else {
        console.log(chalk_1.default.yellow('Default configuration procedure started with options: '), opts);
    }
    opts.protocol = opts.isSSL ? 'https' : 'http';
    const toPopulateEnvVars = [
        `${targetDir}/package.json.replace`,
        `${targetDir}/frontend/package.json.replace`,
        `${targetDir}/frontend/public/js/cfg/cfg.js.replace`,
        `${targetDir}/frontend/webpack.config.js.replace`,
        `${targetDir}/backend/package.json.replace`,
        `${targetDir}/backend/.env.replace`,
        `${targetDir}/backend/webpack.config.js.replace`,
    ];
    (0, configure_1.populateEnvFiles)(toPopulateEnvVars, opts);
    await runCommand('yarn', targetDir);
    return output.program;
}
exports.default = default_1;
