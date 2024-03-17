#!/usr/bin/env node

const RWSConsole = require('@rws-framework/console');
const path = require('path');
const rwsError = console.error;
const rwsLog = console.log;
const getArgs = RWSConsole.rwsArgsHelper;

const { command, args, webpackPath } = getArgs(process.argv);
const cmdKey = `${command}Action`;

(async () => {    
    let Console = {};

    Console = {
        ...Console, 
        initAction: (await import(__dirname + '/actions/initAction.js')).default
    }

    console.log(Console);
    

    if(!Object.keys(Console).includes(cmdKey)){
        console.error(`No command executor "${cmdKey}" is defined`);
        return;
    }

    await Console[command + 'Action'](args);
    rwsLog(`\n[RWS Manager] Finished configuring.`)
})()


