#!/usr/bin/env node

const _tools = require('@rws-framework/server/_tools');
const {RWSManagedConsole, getArgs} = require('./_managed_console');
const rwsLog = console.log;
const rwsError = console.error;
const copy = require('./copy');

const { command, args, webpackPath} = getArgs(process.argv);

class Console extends RWSManagedConsole{
    static initAction = async (args) => {
        rwsLog('act', args, webpackPath)

        if(!args.length){
            throw new Error('Project name needed');            
        }

        const projectName = args[0];

        let targetDir = webpackPath;

        if(args.length > 1){
            targetDir = args[1];
        }

        const copyset = {}

        copyset[targetDir] = ['./sample']        

        copy(copyset);

        _tools.runCommand('yarn', targetDir)
    }
}

Console[command + 'Action'](args);

rwsLog(`[RWS Manager] Finished.`)