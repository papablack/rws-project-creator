import { Options } from './configure';
import path from 'path';
import { v4 as uuid } from 'uuid';

const opts: Options = {    
    pubUrl: '/',
    domain: 'localhost',
    httpPort: 1337,
    wsPort: 1338,
    isSSL: 0,
    hasAuth: 0,
    partedPrefix: 'rws',
    secretKey: uuid(),
    frontRouting: 1,
    serverFilePrefix: 'rws',
    protocol: 'http',
    projectName: null,       
    pubDirAbs: null,
    buildDir: null,
    declarationsRelPath: '../node_modules/@rws-framework/client/declarations.d.ts',
    importBackendCode: 'import * as backendImports from \'../../backend/src/frontendExport\';'  
};

export default opts;
