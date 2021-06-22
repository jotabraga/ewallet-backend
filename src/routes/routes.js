import connection from '../database/connection.js'

export default function routes(app){
    categories(app, connection);
    games(app,connection);
    customers(app,connection);
    rents(app, connection);
}