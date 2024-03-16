import {RWSHTTPRoutingEntry} from 'rws-js-server';

export default (): RWSHTTPRoutingEntry[] => {
    return [    
        // {
        //     prefix: '/api',
        //     routes: [                
        //     ]
        // },        
        {
            name: 'home:index',
            path: '/*',
            noParams: true,
        },       
    ];
};