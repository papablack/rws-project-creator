#!/usr/bin/env node

const { rwsCli } = require('@rws-framework/console');

const bootstrap = rwsCli.bootstrap(['init'], __dirname + '/actions');
(async () => {    
    bootstrap.run({
        args: ['project_name', 'target_dir']
    })
})()


