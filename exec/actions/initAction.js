const RWSConsole = require('@rws-framework/console');
const RWSManagedConsole = RWSConsole.RWSManagedConsole;
const { runCommand } = RWSConsole.rwsShell;
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const { v4 } = require('uuid');


const uuid = v4;
const rwsLog = console.log;
const { copyFiles } = RWSConsole.rwsFS;
const rwsError = console.error;

module.exports = async function (args) {
    if (!args.length) {
        throw new Error('Project name needed');
    }

    const projectName = args[0];

    let targetDir = process.cwd();

    if (args.length > 1) {
        targetDir = args[1];
    }

    targetDir += `/${projectName}`;

    if(fs.existsSync(targetDir)){
        console.log(chalk.red(`Directory ${targetDir} already exists.`));
        return;
    }

    const copyset = {}

    copyset[targetDir] = [path.resolve(__dirname + '/../../sample')]
 
    copyFiles(copyset);

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

    const advConfig = await RWSManagedConsole._askForYn('Advanced (y) or Default (n) install', false);

    if (advConfig) {
        console.log(chalk.yellow('Advanced configuration procedure started. Answer following questions: \n'));

        const buildDir = await RWSManagedConsole._askFor('Build dir', opts.buildDir);
        const pubUrl = await RWSManagedConsole._askFor('Pub URL', opts.pubUrl);
        const domain = await RWSManagedConsole._askFor('Domain', opts.domain);
        const httpPort = await RWSManagedConsole._askFor('HTTP Port', opts.httpPort, parseInt);
        const wsPort = await RWSManagedConsole._askFor('WS Port', opts.wsPort, parseInt);
        const isSSL = parseInt(await RWSManagedConsole._askForYn('Is SSL', opts.isSSL));
        const hasAuth = parseInt(await RWSManagedConsole._askForYn('Has auth', opts.hasAuth));

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
        `${targetDir}/package.json.replace`,
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

    await runCommand('yarn', targetDir);
}