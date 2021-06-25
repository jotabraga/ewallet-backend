import connection from '../database/connection.js';
import register from './user/register.js';

export default function routes(app){

    register(app, connection);

    
}