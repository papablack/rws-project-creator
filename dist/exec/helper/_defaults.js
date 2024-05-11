"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const opts = {
    pubUrl: '/',
    domain: 'localhost',
    httpPort: 1337,
    wsPort: 1338,
    isSSL: 0,
    hasAuth: 0,
    partedPrefix: 'rws',
    secretKey: (0, uuid_1.v4)(),
    frontRouting: 1,
    serverFilePrefix: 'rws',
    protocol: 'http',
    projectName: null,
    pubDirAbs: null,
    buildDir: null,
    declarationsRelPath: '../node_modules/@rws-framework/client/declarations.d.ts',
    importBackendCode: 'import * as backendImports from \'../../backend/src/frontendExport\';'
};
exports.default = opts;
