import { serverInit, ConsoleService } from '@rws-framework/server';
import config from './config/config';

// import path from 'path';

async function main(){            
    await serverInit(config());

    //custom cfg
}

main().then(() => {
    ConsoleService.log('Initialization complete');
}).catch((e) => {
    ConsoleService.error(e);
    console.error(e);
});