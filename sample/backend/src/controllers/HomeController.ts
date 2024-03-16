import { RWSannotations, RWSController, IRequestParams } from 'rws-js-server';

const { Route } = RWSannotations.routingAnnotations;

class HomeController extends RWSController{
    @Route('home:index', 'GET', { responseType: 'html' })
    public indexAction(params: IRequestParams): any
    {        
        return {
            template_name: 'index',
            template_params: {
                hello: 'world'
            }
        };
    }
}

export default HomeController.getSingleton();