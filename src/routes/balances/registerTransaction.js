import dayjs from 'dayjs';

export default function registerTransaction(app, connection){

    app.post('/transactions', async (req, res) => {
		const token = req.get('authorization')?.replace('Bearer ', '');
		const { amount, description, type } = req.body;

		try {
			if (!token){
                return res.sendStatus(401);
            } 
            
            const sql = `SELECT * FROM sessions 
                         WHERE token = $1`;
			const logged = await connection.query(sql, [token]);
			const stillLogged = session.rows[0];

			if (!stillLogged){
                return res.send(401);

            } else {
                const date = dayjs().format('YYYY-MM-DD');
                const sql = `INSERT INTO transaction
                            ("userId", value, description, date, type)
                            VALUES ($1, $2, $3, $4, $5)`;
    
                await connection.query(sql, [stillLogged.userId, Math.abs(amount * 100),
                                             description, date, type]);    
                res.sendStatus(201);
            }
		} catch (e) {
			console.log(e);
			res.sendStatus(500);
		}
	});
}