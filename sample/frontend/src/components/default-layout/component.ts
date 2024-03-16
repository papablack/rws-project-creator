import { RWSViewComponent, RWSView, observable, _ROUTING_EVENT_NAME, IRoutingEvent } from 'rws-js-client';

import EV from '../../events/events';
import { RouterComponent } from 'rws-js-client/src/components/router/component';

RouterComponent;

@RWSView('default-layout')
class DefaultLayout extends RWSViewComponent {  
  

  @observable currentPage: string;
  @observable menuOpen: boolean = true;

  @observable currentUrl: string = window.location.pathname;


  connectedCallback(): void 
  {
      super.connectedCallback();    
    
      this.$emit(_ROUTING_EVENT_NAME, (route_event: IRoutingEvent) => {
          this.currentPage = route_event.routeName;
      });

      this.$emit(EV.menu.toggle, (route_event: IRoutingEvent) => {
          this.menuOpen = !this.menuOpen;
      });

      this.on<{item: string}>('routing.url.changed', (event) => {
          const url = event.detail.item;
      
          this.currentUrl = url;      
      });
  }
}

DefaultLayout.defineComponent();

export { DefaultLayout };