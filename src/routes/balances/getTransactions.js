import dayjs from 'dayjs';

export default function getTransactions(app, connection){

    app.get('/transactions', async (req, res) => {

		const token = req.get('authorization')?.replace('Bearer ', '');

        try{
            if (!token){
                return res.sendStatus(401);
            } 

            const sql = `SELECT * FROM sessions 
                        WHERE token = $1`;
            const logged = await connection.query(sql, [token]);
            const stillLogged = logged.rows[0];
            
            if (!stillLogged){
                return res.sendStatus(401);

            } else{
                const { userId } = stillLogged;
                const entriesSql = `SELECT * FROM transaction 
                                    WHERE "userId" = $1`;
                const transactions = await connection.query(entriesSql, [userId]);

                const infoToShow = transactions.map((t) => {
                    t.date = dayjs(t.date).format("DD/MM");
                    delete t.userId;
                    return t;
                });

                const balance = transactions.reduce((acc, cur) => {
                    cur.type === 'income' ? acc + cur.value : acc - cur.value, 0
                });              
                                  
                res.send({infoToShow, balance});
            }

        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
    });
}