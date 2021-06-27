import connection from '../database/connection.js';
import register from './user/register.js';
import logIn from './user/logIn.js';
import logOut from './user/logOut.js'
import getTransactions from './balances/getTransactions.js'
import registerTransaction from './balances/registerTransaction.js';

export default function routes(app){
    register(app, connection);
    logIn(app, connection);
    logOut(app, connection);
    getTransactions(app,connection);
    registerTransaction(app, connection);    
}