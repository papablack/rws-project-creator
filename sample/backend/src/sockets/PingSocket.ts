import { RWSSocket, Socket } from '@rws-framework/server';

class PingSocket extends RWSSocket {
    handleConnection(socket: Socket, routeName: string): Socket {
        // const _self = this;      

        socket.on(routeName, async (dataString: string) => {
            // let thePrompt: RWSPrompt;


            // try {
           
            // } catch (error) {
            //     ConsoleService.error(error);
            // }
        });

        return socket;
    }

    middlewareImplementation(next: CallableFunction) {
        return next();
    }
}

export default PingSocket;
export {};