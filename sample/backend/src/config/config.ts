import { IAppConfig } from '@rws-framework/server';

import JWTUser from '../user/model';
import { getModels } from '../models';
import ControllerList from '../controllers/index';
import routes from '../routing/routes';
import ws_routes from '../routing/sockets';
import CommandList from '../commands';
import dotenv from 'dotenv';


export default (): IAppConfig => {
    dotenv.config();
    const DB_NAME: string | undefined = process.env.MONGO_DB_NAME;
    const DB_HOST: string | undefined = process.env.MONGO_HOST;
    const DB_PORT: number | undefined = parseInt(process.env.MONGO_PORT as string);
    const DB_USER: string | undefined = process.env.MONGO_INITDB_ROOT_USERNAME;
    const DB_PASS: string | undefined = process.env.MONGO_INITDB_ROOT_PASSWORD;

    const MONGO_PREFIX: string | undefined = process.env.MONGO_PREFIX || 'mongodb+srv';
    const MONGO_SUFFIX: string | undefined = process.env.MONGO_SUFFIX || '?retryWrites=true&w=majority';

    const AWS_ACCESS_KEY: string | undefined = process.env.AWS_ACCESS_KEY;
    const AWS_SECRET_KEY: string | undefined = process.env.AWS_SECRET_KEY;

    const APP_DOMAIN: string | undefined = process.env.APP_DOMAIN;
    const PUB_FOLDER: string | undefined = process.env.PUB_FOLDER;

    const APP_PORT: number = parseInt(process.env.APP_PORT as string);
    const APP_WS_PORT: number = parseInt(process.env.APP_WS_PORT as string);
    const TESTING_PORT: number = parseInt(process.env.TESTING_PORT as string);
    const APP_SSL: boolean = process.env.APP_SSL === '1';
    const APP_CORS_ALLOW: string | undefined = process.env.APP_CORS_ALLOW ? process.env.APP_CORS_ALLOW : APP_DOMAIN;

    const dbString: string = `${MONGO_PREFIX}://${DB_USER}:${DB_PASS}@${DB_HOST}${MONGO_PREFIX !== 'mongodb+srv' ? (':' + DB_PORT) : ''}/${DB_NAME}${MONGO_SUFFIX}`;        

    return {
        features: {
            ws_enabled: true,
            routing_enabled: true,
            ssl: APP_SSL,
            auth: false
        },
        mongo_url: dbString,
        mongo_db: DB_NAME as string,
        port: APP_PORT,        
        ws_port: APP_WS_PORT,
        test_port: TESTING_PORT,
        domain: APP_DOMAIN as string,
        cors_domain: APP_CORS_ALLOW,
        ssl_cert: '',
        ssl_key: '',
        secret_key: '',
        user_class: JWTUser,
        user_models: getModels(),
        controller_list: ControllerList,
        ws_routes: ws_routes,
        http_routes: routes(),
        commands: CommandList,
        aws_lambda_region: undefined,        
        aws_access_key: AWS_ACCESS_KEY,
        aws_secret_key: AWS_SECRET_KEY,
        aws_lambda_role: undefined,
        aws_lambda_bucket: undefined,
        pub_dir: PUB_FOLDER,        
    };
};