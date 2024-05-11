import RWSClient, { RWSContainer } from '@rws-framework/client';

import initComponents from './application/_initComponents';
import './styles/main.scss';

import routes from './routing/routes';
import notifierMethod from './_notifier';

async function initializeApp() {
    const theClient = RWSContainer().get(RWSClient);

    theClient.enableRouting();
    theClient.addRoutes(routes);    
    
    theClient.onInit(async () => {
        initComponents();
    });    

    theClient.setNotifier(notifierMethod);
    theClient.assignClientToBrowser();   

    // await theClient.onDOMLoad();
    theClient.start({
        partedDirUrlPrefix: '/js',
        parted: false
    });
}

initializeApp().catch(console.error);
