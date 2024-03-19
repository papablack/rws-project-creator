import {RWSManagedConsole, rwsShell, rwsFS, rwsPath} from '@rws-framework/console';
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import { v4 as uuid } from 'uuid';
import { Options, populateEnvFiles } from '../helper/configure';
import { askQuestions } from '../helper/ask';
import { rwsCliVisHelpers } from '@rws-framework/console-vis';

const packageExecDir =  path.resolve(__dirname);

const { runCommand } = rwsShell;
const { copyFiles } = rwsFS;

export default async function(output: { rawArgs?: string[]; program?: any }): Promise<any> 
{  
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

    if(fs.existsSync(targetDir)){
        console.log(chalk.red(`Directory ${targetDir} already exists.`));
        return;
    }

    const copyset: Record<string, string[]> = {};

    copyset[targetDir] = [path.resolve(rwsPath.findPackageDir(__dirname) + '/sample')];
 
    copyFiles(copyset);

    const opts: Options = {
        projectName,
        pubUrl: '/',
        pubDirAbs: path.resolve(targetDir, 'frontend','public'),
        buildDir: path.resolve(targetDir, 'frontend', 'public', 'js'),
        domain: 'localhost',
        httpPort: 1337,
        wsPort: 1338,
        isSSL: 0,
        hasAuth: 0,
        partedPrefix: 'rws',
        secretKey: uuid(),
        frontRouting: 1,
        serverFilePrefix: 'rws',
        protocol: 'http'
    };

    const advConfig: boolean | null = await rwsCliVisHelpers.cli.select<boolean>('advConfig', 'What install mode do you wish to pick?', [
        { name: 'default', value: false, message: 'Default mode.' },
        { name: 'advanced', value: true, message: 'Advanced mode.' }
    ]);

    if (advConfig) {
        console.log(chalk.yellow('Advanced configuration procedure started. Answer following questions: \n'));

        await askQuestions(opts);
    } else {
        console.log(chalk.yellow('Default configuration procedure started with options: '),  opts);
    }

    opts.protocol = opts.isSSL ? 'https' : 'http';

    const toPopulateEnvVars: string[] = [
        `${targetDir}/package.json.replace`,
        `${targetDir}/frontend/package.json.replace`,
        `${targetDir}/frontend/public/js/cfg/cfg.js.replace`,
        `${targetDir}/frontend/webpack.config.js.replace`,
        `${targetDir}/backend/package.json.replace`,
        `${targetDir}/backend/.env.replace`,
        `${targetDir}/backend/webpack.config.js.replace`,            
    ];

    populateEnvFiles(toPopulateEnvVars, opts);

    await runCommand('yarn', targetDir);
    
    return output.program;
}