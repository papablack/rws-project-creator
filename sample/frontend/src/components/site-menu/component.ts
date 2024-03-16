import { RWSViewComponent, RWSView } from 'rws-js-client';
import {  observable  } from '@microsoft/fast-element';


interface ILink {
  label: string;
  url: string;
}

@RWSView('site-menu')
class SiteMenu extends RWSViewComponent {

  @observable links: ILink[] = [
      { label: 'Home', url: '/' },
      { label: 'Servers', url: '/servers' },
  ];

  handleClick(event: Event, link: ILink): void {
      if(event){
          event.preventDefault();
      }
      
    
      this.$emit('routing.url.changed', {
          item: link.url
      });
  }
}

SiteMenu.defineComponent();

export { SiteMenu, ILink };