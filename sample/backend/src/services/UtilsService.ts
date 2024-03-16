
import { v4 as uuid } from 'uuid';


function uniqid(prefix: string = null): string
{
    return (prefix ? `${prefix}_` : '') + uuid();
}

export default {
    uniqid
};