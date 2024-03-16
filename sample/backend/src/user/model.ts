import { JwtPayload } from 'jsonwebtoken';


const _fill = (object: JWTUser, data: any): void => {
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            (object as any)[key] = data[key];
        }
    }        
};

class JWTUser {
    mongoId: string;
    message: string;
    name: string;
    firstname: string;
    lastname: string;
    accountType: string;
    email: string;

    constructor(data?: string | JwtPayload){
        if(data && typeof data !== 'string'){
            _fill(this, data);
        }
    }    
}

export default JWTUser;