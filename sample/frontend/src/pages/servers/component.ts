import { RWSViewComponent, RWSView } from 'rws-js-client';


@RWSView('page-servers')
class ServersPage extends RWSViewComponent {  
  
    connectedCallback(): void 
    {
        super.connectedCallback();    
    }
}

ServersPage.defineComponent();

export { ServersPage };