import dayjs from 'dayjs';

export default function registerTransaction(app, connection){

    app.post('/transactions', async (req, res) => {
		const token = req.get('authorization')?.replace('Bearer ', '');
		const { value, description } = req.body;
		const [date, type] = [dayjs().format('YYYY-MM-DD'), 'outflow'];
		const sql = `
                    INSERT INTO entries
                    ("userId", value, description, date, type)
                    VALUES ($1, $2, $3, $4, $5)`;

		try {
			if (!token) return res.sendStatus(401);

			const session = await connection.query(
				`SELECT * FROM sessions WHERE token = $1`,
				[token]
			);
			const activeSession = session.rows[0];

			if (!activeSession) return res.send(401);

			await connection.query(sql, [
				activeSession.userId,
				Math.abs(value * 100),
				description,
				date,
				type,
			]);

			res.sendStatus(201);
		} catch (err) {
			console.log(err);
			res.sendStatus(500);
		}
	});


}