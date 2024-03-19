#!/usr/bin/env node

import { rwsCli } from '@rws-framework/console';
import path from 'path';



 const packageExecDir =  path.resolve(__dirname);
 
const bootstrap = rwsCli.bootstrap(['init'], packageExecDir + '/actions');

(async () => {    
    bootstrap.run({
        args: ['project_name', 'target_dir'],
        options: [{
            short: 'o',
            long: 'override',
            defaultValue: 'false'
        }]
    });
})();

