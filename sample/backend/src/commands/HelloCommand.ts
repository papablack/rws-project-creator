import { ICmdParams, RWSCommand, ConsoleService } from '@rws-framework/server';

const {log, color} = ConsoleService; 

class HelloCommand extends RWSCommand {
    constructor(){
        super('hello', module);
    }

    async execute(params?: ICmdParams): Promise<void> {
        log(color().blue('<HELLO COMMAND>\n'));
        log(color().green('    Thanks for installing junction trainer/chat instance, ' + params.user + '\n\n'));
        log('    This is output of example command for RWS JS server framework.');
        log(color().red('                                   (src/commands/HelloCommand.ts).\n'));
        log(color().yellowBright('    Develop your server with "npm run dev"\n'));
        log(color().yellowBright('    Or build and start with "npm run build" and "npm run server"\n'));
        log('\n\n\n    Params passed to this command (those starting with "_" are autogenrated by console script)');
        log(params);
        log(color().blue('\n</HELLO COMMAND>'));
    }
}

export default HelloCommand.createCommand();