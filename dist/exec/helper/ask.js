"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.askQuestions = void 0;
const console_1 = require("@rws-framework/console");
async function askQuestions(opts) {
    const buildDir = await console_1.RWSManagedConsole._askFor('Build dir', opts.buildDir);
    const pubUrl = await console_1.RWSManagedConsole._askFor('Pub URL', opts.pubUrl);
    const domain = await console_1.RWSManagedConsole._askFor('Domain', opts.domain);
    const httpPort = await console_1.RWSManagedConsole._askFor('HTTP Port', opts.httpPort, parseInt);
    const wsPort = await console_1.RWSManagedConsole._askFor('WS Port', opts.wsPort, parseInt);
    const isSSL = (await console_1.RWSManagedConsole._askForYn('Is SSL')) ? 1 : 0;
    const hasAuth = (await console_1.RWSManagedConsole._askForYn('Has auth')) ? 1 : 0;
    const partedPrefix = await console_1.RWSManagedConsole._askFor('Parted component prefix', opts.partedPrefix);
    const serverFilePrefix = await console_1.RWSManagedConsole._askFor('Server file prefix', opts.serverFilePrefix);
    opts.buildDir = buildDir;
    opts.pubDirAbs = pubUrl;
    opts.domain = domain;
    opts.httpPort = httpPort;
    opts.wsPort = wsPort;
    opts.isSSL = isSSL;
    opts.hasAuth = hasAuth;
    opts.partedPrefix = partedPrefix;
    opts.serverFilePrefix = serverFilePrefix;
}
exports.askQuestions = askQuestions;
