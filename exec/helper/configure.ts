
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';

export interface Options {
    projectName: string | null | undefined;
    pubUrl: string | null | undefined;
    pubDirAbs: string | null | undefined;
    buildDir: string | null | undefined;
    domain: string | null | undefined;
    httpPort: number | null | undefined;
    wsPort: number | null | undefined;
    isSSL: number | null | undefined;
    hasAuth: number | null | undefined;
    partedPrefix: string | null | undefined;
    secretKey: string | null | undefined;
    frontRouting: number | null | undefined;
    serverFilePrefix: string | null | undefined;
    protocol: string | null | undefined;
    declarationsRelPath: string | null | undefined;
    importBackendCode: string | null | undefined;
}

export function populateEnvFiles(toPopulateEnvVars: string[], opts: Options): void
{ 

    for (const envVarSourcePath of toPopulateEnvVars){
        const envVarSource = path.resolve(envVarSourcePath);
        const sourceFileContent = fs.readFileSync(envVarSource, 'utf-8');
        let replacedFileContent = sourceFileContent;

        Object.keys(opts).forEach((key) => {
            const option = opts[key as keyof Options];
            replacedFileContent = replacedFileContent.replace(new RegExp('\\[\\[' + key + '\\]\\]', 'g'), option as string);
        });

        fs.unlinkSync(envVarSource);
        fs.writeFileSync(envVarSource.replace('.replace', ''), replacedFileContent);                
    }

    console.log(chalk.blue('Environment prepared. Running install scripts on location:'));            
}