import connection from '../database/connection.js';
import register from './user/register.js';
import logIn from './user/logIn.js';
import logOut from './user/logOut.js'

export default function routes(app){

    register(app, connection);
    logIn(app, connection);
    logOut(app, connection);


    
}