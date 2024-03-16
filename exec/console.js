#!/usr/bin/env node

const _tools = require('@rws-framework/server/_tools');
const { RWSManagedConsole, getArgs } = require('./_managed_console');
const rwsLog = console.log;
const rwsError = console.error;
const copy = require('./copy');
const path = require('path');
const fs = require('fs');
const { v4 } = require('uuid');
const chalk = require('chalk');
const uuid = v4;

const { command, args, webpackPath } = getArgs(process.argv);

class Console extends RWSManagedConsole {


    static initAction = async (args) => {
        rwsLog('act', args, webpackPath)

        if (!args.length) {
            throw new Error('Project name needed');
        }

        const projectName = args[0];

        let targetDir = webpackPath;

        if (args.length > 1) {
            targetDir = args[1];
        }

        targetDir += `/${projectName}`;

        const copyset = {}

        copyset[targetDir] = ['./sample']

        copy(copyset);

        let opts = {
            projectName,
            pubUrl: '/',
            pubDirAbs: path.resolve(targetDir, 'frontend','public'),
            buildDir: path.resolve(targetDir, 'frontend', 'public', 'js'),
            domain: 'localhost',
            httpPort: 1337,
            wsPort: 1338,
            isSSL: 0,
            hasAuth: 0,
            secretKey: uuid(),
            frontRouting: 1
        }

        const advConfig = await this._askForYn('Advanced (y) or Default (n) install', false);

        if (advConfig) {
            console.log(chalk.yellow('Advanced configuration procedure started. Answer following questions: \n'));

            const buildDir = await this._askFor('Build dir', opts.buildDir);
            const pubUrl = await this._askFor('Pub URL', opts.pubUrl);
            const domain = await this._askFor('Domain', opts.domain);
            const httpPort = await this._askFor('HTTP Port', opts.httpPort, parseInt);
            const wsPort = await this._askFor('WS Port', opts.wsPort, parseInt);
            const isSSL = parseInt(await this._askForYn('Is SSL', opts.isSSL));
            const hasAuth = parseInt(await this._askForYn('Has auth', opts.hasAuth));

            opts = {
                ...opts,
                buildDir,
                domain,
                httpPort,
                wsPort,
                isSSL,
                hasAuth,
                pubUrl
            }
        }else{
            console.log(chalk.yellow('Default configuration procedure started with options: '),  opts);
        }

        opts.protocol = opts.isSSL ? 'https' : 'http';

        const toPopulateEnvVars = [
            `${targetDir}/frontend/package.json.replace`,
            `${targetDir}/frontend/public/js/cfg/cfg.js.replace`,
            `${targetDir}/frontend/webpack.config.js.replace`,
            `${targetDir}/backend/package.json.replace`,
            `${targetDir}/backend/.env.replace`,
            `${targetDir}/backend/webpack.config.js.replace`,            
        ];



        toPopulateEnvVars.forEach((envVarSource) => {
            envVarSource = path.resolve(envVarSource);
            const sourceFileContent = fs.readFileSync(envVarSource, 'utf-8');
            let replacedFileContent = sourceFileContent;
            Object.keys(opts).forEach((key) => {
                const option = opts[key];
                replacedFileContent = replacedFileContent.replace(new RegExp('\\[\\[' + key + '\\]\\]', 'g'), option);            });

            fs.unlinkSync(envVarSource);
            fs.writeFileSync(envVarSource.replace('.replace', ''), replacedFileContent);
        });

        console.log(chalk.blue('Environment prepared. Running install scripts on location:'));

        await _tools.runCommand('yarn', targetDir);
    }
}

Console[command + 'Action'](args).then(() => {
    rwsLog(`\n[RWS Manager] Finished configuring.`)
});