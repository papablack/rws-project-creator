import { RWSService } from 'rws-js-server';

import IVMConfig from '../interfaces/IRunpodCfg';


class RunpodService extends RWSService {
    constructor(){
        super();

    }

    async deployMachine(vmConfig: IVMConfig) {
      
    }

    async callStableDiffusionApi(url: string, prompt: string, params: any) {
        
    }
}

export default RunpodService.getSingleton();