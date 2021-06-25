
export default function logOut(app, connection){

    app.post('/logout', async (req, res) => {

		try {  
            const token = req.headers['authorization']?.replace("Bearer ", ""); 

			if (!token){
                return res.sendStatus(400);

            } else {
                const sql = `DELETE FROM sessions 
                WHERE token = $1`;
                await connection.query(sql, [token]);
                res.sendStatus(200);
            }
		} catch (err) {
			console.log(err);
			res.sendStatus(500);
		}
	});
}