import RWSClient, { RWSContainer, loadRWSRichWindow } from '@rws-framework/client';
import { RWSWebsocketsPlugin, WSOptions } from '@rws-framework/nest-interconnectors';
import { RWSBrowserRouter } from '@rws-framework/browser-router';
import initComponents from './application/_initComponents';
import './styles/main.scss';

import routes from './routing/routes';
import notifierMethod from './_notifier';

async function initializeApp() {
    const theClient = RWSContainer().get(RWSClient);
    
    theClient.onInit(async () => {
        initComponents();
    });    

    theClient.setNotifier(notifierMethod);

    theClient.addPlugin(RWSWebsocketsPlugin);
    theClient.addPlugin(RWSBrowserRouter);

    theClient.assignClientToBrowser();   

    (loadRWSRichWindow().RWS.plugins['RWSBrowserRouter'] as RWSBrowserRouter).addRoutes(routes);        

    // await theClient.onDOMLoad();
    theClient.start({
        partedDirUrlPrefix: '/js',
        parted: false
    });
}

initializeApp().catch(console.error);
