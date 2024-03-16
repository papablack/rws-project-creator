const _tools = require('@rws-framework/server/_tools');

const rwsError = console.error;
const rwsLog = console.error;
const path = require('path');
const fs = require('fs');
const os = require('os');

function getArgs(procArgs){
    const command2map = procArgs[2];
    let args = procArgs[3] || '';

    const extraArgsAggregated = [];

    if(process.argv.length > 4){
        for(let i = 4; i <= process.argv.length-1;i++){
            extraArgsAggregated.push(process.argv[i]);
        }
    }

    const totalMemoryBytes = os.totalmem();
    const totalMemoryKB = totalMemoryBytes / 1024;
    const totalMemoryMB = totalMemoryKB / 1024;
    const totalMemoryGB = totalMemoryMB / 1024;


    const webpackPath = path.resolve(__dirname, '..');

    const packageRootDir = _tools.findRootWorkspacePath(process.cwd());
    const moduleCfgDir = `${packageRootDir}/node_modules/.rws`;      
    const rwsLog = console.log;
    const rwsError = console.error;

    if(!command2map){
        command2map = 'init'
    }

    if(args && extraArgsAggregated.length){
        args = [
            args,
            ...extraArgsAggregated
        ]
    }else if(args && typeof args === 'string'){
        args = [args]
    }

    return {
        command: command2map,
        args,
        moduleCfgDir,
        webpackPath,
        packageRootDir
    };
}

class RWSManagedConsole { 

}


module.exports = {RWSManagedConsole, getArgs};