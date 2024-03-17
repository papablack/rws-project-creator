#!/usr/bin/env node

const RWSConsole = require('@rws-framework/console');

const rwsError = console.error;
const rwsLog = console.log;
const getArgs = RWSConsole.rwsArgsHelper;

const { command, args, webpackPath } = getArgs(process.argv);

let Console = {};

const initAction = require('./actions/initAction');
Console = {...Console, initAction: initAction.bind(console)}

const cmdKey = `${command}Action`;


if(!Object.keys(Console).includes(cmdKey)){
    console.error(`No command executor "${cmdKey}" is defined`);
    return;
}

Console[command + 'Action'](args).then(() => {
    rwsLog(`\n[RWS Manager] Finished configuring.`)
});