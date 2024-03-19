import {RWSManagedConsole} from '@rws-framework/console';
import { rwsCliVisHelpers } from '@rws-framework/console-vis';

import { Options } from './configure';

export async function askQuestions(opts: Options)
{    
    const buildDir = await RWSManagedConsole._askFor('Build dir', opts.buildDir);
    const pubUrl = await RWSManagedConsole._askFor('Pub URL', opts.pubUrl);
    const domain = await RWSManagedConsole._askFor('Domain', opts.domain);
    const httpPort = await RWSManagedConsole._askFor('HTTP Port', opts.httpPort, parseInt);
    const wsPort = await RWSManagedConsole._askFor<number>('WS Port', opts.wsPort, parseInt);
    const isSSL = (await RWSManagedConsole._askForYn('Is SSL')) ? 1 : 0;
    const hasAuth = (await RWSManagedConsole._askForYn('Has auth')) ? 1 : 0;
    const partedPrefix = await RWSManagedConsole._askFor('Parted component prefix', opts.partedPrefix);
    const serverFilePrefix = await RWSManagedConsole._askFor('Server file prefix', opts.serverFilePrefix);

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