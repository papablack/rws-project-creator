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
export declare function populateEnvFiles(toPopulateEnvVars: string[], opts: Options): void;
