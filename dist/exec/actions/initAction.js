"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("@rws-framework/console");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
const configure_1 = require("../helper/configure");
const ask_1 = require("../helper/ask");
const console_vis_1 = require("@rws-framework/console-vis");
const _defaults_1 = __importDefault(require("../helper/_defaults"));
const { runCommand } = console_1.rwsShell;
const { copyFiles } = console_1.rwsFS;
const _BUILD_MODES = {
    default: '_rws_default_build_mode',
    advanced: '_rws_advanced_build_mode',
    frontonly: '_rws_frontend_build_mode',
    backonly: '_rws_backend_build_mode'
};
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
        if (output.options.override === 'true') {
            console.log(chalk_1.default.yellowBright(`Directory ${targetDir} already exists. Overriding with flag --override true`));
            await runCommand('rm -rf ' + targetDir);
        }
        else {
            console.log(chalk_1.default.red(`Directory ${targetDir} already exists.`));
            return;
        }
    }
    const copyset = {};
    const opts = {
        ..._defaults_1.default,
        projectName,
        pubDirAbs: path_1.default.resolve(targetDir, 'frontend', 'public'),
        buildDir: path_1.default.resolve(targetDir, 'frontend', 'public', 'js'),
    };
    opts.protocol = opts.isSSL ? 'https' : 'http';
    const noBackendImport = 'const backendImports: any = {};';
    const buildMode = await console_vis_1.rwsCliVisHelpers.cli.select('advConfig', 'What install mode do you wish to pick?', [
        { name: _BUILD_MODES.default, value: _BUILD_MODES.default, message: 'Default fullstack mode (with default settings).' },
        { name: _BUILD_MODES.frontonly, value: _BUILD_MODES.frontonly, message: 'Frontend mode (with default settings).' },
        { name: _BUILD_MODES.backonly, value: _BUILD_MODES.backonly, message: 'Backend mode (with default settings).' },
        { name: _BUILD_MODES.advanced, value: _BUILD_MODES.advanced, message: 'Advanced mode (with custom picked settings).' }
    ], _BUILD_MODES.default);
    console.log({ buildMode });
    const advConfig = buildMode === _BUILD_MODES.advanced;
    let sourceRelDir = 'sample';
    const ignoredFiles = [];
    const fullEnv = [
        `${targetDir}/package.json.replace`,
    ];
    const frontEnv = [
        `${targetDir}/frontend/package.json.replace`,
        `${targetDir}/frontend/tsconfig.json.replace`,
        `${targetDir}/frontend/public/js/cfg/cfg.js.replace`,
        `${targetDir}/frontend/webpack.config.js.replace`,
    ];
    const backEnv = [
        `${targetDir}/backend/package.json.replace`,
        `${targetDir}/backend/.env.replace`,
        `${targetDir}/backend/webpack.config.js.replace`,
    ];
    const callbacks = [];
    const buildCallback = async () => { await runCommand('yarn build', targetDir); };
    let toPopulateEnvVars = [...fullEnv, ...frontEnv, ...backEnv];
    switch (buildMode) {
        case _BUILD_MODES.advanced:
            break;
        case _BUILD_MODES.frontonly:
            sourceRelDir = 'sample/frontend';
            toPopulateEnvVars = [...frontEnv.map(txt => txt.replace('frontend/', '/')), `${targetDir}/src/backendImport.ts.replace`];
            opts.declarationsRelPath = './node_modules/@rws-framework/client/declarations.d.ts';
            ignoredFiles.push(new RegExp('.*sample\/backend\/*'));
            opts.importBackendCode = noBackendImport;
            callbacks.push(buildCallback);
            break;
        case _BUILD_MODES.backonly:
            sourceRelDir = 'sample/backend';
            toPopulateEnvVars = backEnv.map(txt => txt.replace('backend/', '/'));
            ignoredFiles.push(new RegExp('.*sample\/frontend/*'));
            callbacks.push(buildCallback);
            break;
        default:
        case _BUILD_MODES.default:
            break;
    }
    if (advConfig) {
        console.log(chalk_1.default.yellow('Advanced configuration procedure started. Answer following questions: \n'));
        await (0, ask_1.askQuestions)(opts);
    }
    else {
        console.log(chalk_1.default.yellow('Default configuration procedure started with options: '), opts);
    }
    copyset[targetDir] = [path_1.default.resolve(console_1.rwsPath.findPackageDir(__dirname) + '/' + sourceRelDir)];
    copyFiles(copyset);
    (0, configure_1.populateEnvFiles)(toPopulateEnvVars, opts);
    await runCommand('yarn', targetDir);
    for (const callback of callbacks) {
        await callback();
    }
    return output.program;
}
exports.default = default_1;
