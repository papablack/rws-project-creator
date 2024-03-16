import {RWSHTTPRoutingEntry} from '@rws-framework/server';

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