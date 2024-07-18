import { rwsShell, rwsFS, rwsPath } from '@rws-framework/console';
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import { Options, populateEnvFiles } from '../helper/configure';
import { askQuestions } from '../helper/ask';
import { rwsCliVisHelpers } from '@rws-framework/console-vis';
import _defaultOptions from '../helper/_defaults';

const { runCommand } = rwsShell;
const { copyFiles } = rwsFS;

type BuildMode = '_rws_default_build_mode' | '_rws_advanced_build_mode' | '_rws_frontend_build_mode' | '_rws_backend_build_mode';

type BuildModesHolder = { [key: string]: BuildMode };

const _BUILD_MODES: BuildModesHolder = {
    default: '_rws_default_build_mode',
    advanced: '_rws_advanced_build_mode',
    frontonly: '_rws_frontend_build_mode',
    backonly: '_rws_backend_build_mode'
};

export default async function(output: any): Promise<any> 
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
        if(output.options.override === 'true'){
            console.log(chalk.yellowBright(`Directory ${targetDir} already exists. Overriding with flag --override true`));
            await runCommand('rm -rf ' + targetDir);

        }else{
            console.log(chalk.red(`Directory ${targetDir} already exists.`));
            return;
        }
    }

    const copyset: Record<string, string[]> = {};    

    const opts: Options = {
        ..._defaultOptions,
        projectName,       
        pubDirAbs: path.resolve(targetDir, 'frontend','public'),
        buildDir: path.resolve(targetDir, 'frontend', 'public', 'js'),        
    };
    opts.protocol = opts.isSSL ? 'https' : 'http';

    const noBackendImport = 'const backendImports: any = {};';

    const buildMode: BuildMode | null = await rwsCliVisHelpers.cli.select<BuildMode>('advConfig', 'What install mode do you wish to pick?', [
        { name: _BUILD_MODES.default as string, value: _BUILD_MODES.default, message: 'Default fullstack mode (with default settings).' },
        { name: _BUILD_MODES.frontonly as string, value: _BUILD_MODES.frontonly, message: 'Frontend mode (with default settings).' },
        { name: _BUILD_MODES.backonly as string, value: _BUILD_MODES.backonly, message: 'Backend mode (with default settings).' },
        { name: _BUILD_MODES.advanced as string, value: _BUILD_MODES.advanced, message: 'Advanced mode (with custom picked settings).' }
    ], _BUILD_MODES.default);

    console.log({buildMode});

    const advConfig = buildMode === _BUILD_MODES.advanced;
    let sourceRelDir = 'sample';

    const ignoredFiles: RegExp[] = [];    

    const fullEnv: string[] = [
        `${targetDir}/package.json.replace`,
    ];

    const frontEnv: string[] = [
        `${targetDir}/frontend/package.json.replace`,
        `${targetDir}/frontend/tsconfig.json.replace`,        
        `${targetDir}/frontend/public/js/cfg/cfg.js.replace`,
        `${targetDir}/frontend/webpack.config.js.replace`,
    ];

    const backEnv: string[] = [              
        `${targetDir}/backend/package.json.replace`,
        `${targetDir}/backend/.env.replace`,
        `${targetDir}/backend/webpack.config.js.replace`,    
    ];

    const callbacks: (() => Promise<void>)[] = [];
    const buildCallback: () => Promise<void> = async () => {  await runCommand('npm run build', targetDir); };

    let toPopulateEnvVars: string[] = [...fullEnv,...frontEnv, ...backEnv];

    switch(buildMode){
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
        console.log(chalk.yellow('Advanced configuration procedure started. Answer following questions: \n'));

        await askQuestions(opts);


    } else {
        
        console.log(chalk.yellow('Default configuration procedure started with options: '),  opts);
    }
    
    copyset[targetDir] = [path.resolve(rwsPath.findPackageDir(__dirname) + '/' + sourceRelDir)];    

    copyFiles(copyset);
 
    populateEnvFiles(toPopulateEnvVars, opts);

    if(buildMode === _BUILD_MODES.frontonly){
        const fullstackCommentRegEx = /.*\/\/@rws-fullstack-mode\r?\n[^\r\n]*(\r?\n)?/gm;
        const indexFrontFilePath = path.resolve(targetDir, 'src', 'index.ts');

        const removeFullstackFilesPaths = [
            indexFrontFilePath
        ]

        for (const filepath of removeFullstackFilesPaths){
            const orgFileContent: string = fs.readFileSync(filepath, 'utf-8');
            const replaced = orgFileContent.replace(fullstackCommentRegEx, '');            
            fs.writeFileSync(filepath, replaced);
        }        
    }    

    await runCommand('npm install', targetDir);

    for (const callback of callbacks){
        await callback();
    }
    
    return output.program;
}