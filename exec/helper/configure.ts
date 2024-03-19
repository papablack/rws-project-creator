
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';

export interface Options {
    projectName: string | null;
    pubUrl: string | null;
    pubDirAbs: string | null;
    buildDir: string | null;
    domain: string | null;
    httpPort: number | null;
    wsPort: number | null;
    isSSL: number | null;
    hasAuth: number | null;
    partedPrefix: string | null;
    secretKey: string | null;
    frontRouting: number | null;
    serverFilePrefix: string | null;
    protocol: string | null;
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