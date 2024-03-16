import { RWSViewComponent, RWSView } from 'rws-js-client';


@RWSView('page-home')
class HomePage extends RWSViewComponent {  
  
    connectedCallback(): void 
    {
        super.connectedCallback();    
    }
}

HomePage.defineComponent();

export { HomePage };