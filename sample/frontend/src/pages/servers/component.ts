import { RWSViewComponent, RWSView } from '@rws-framework/client';


@RWSView('page-servers')
class ServersPage extends RWSViewComponent {  
  
    connectedCallback(): void 
    {
        super.connectedCallback();    
    }
}

ServersPage.defineComponent();

export { ServersPage };