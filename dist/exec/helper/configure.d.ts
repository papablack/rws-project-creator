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
export declare function populateEnvFiles(toPopulateEnvVars: string[], opts: Options): void;
