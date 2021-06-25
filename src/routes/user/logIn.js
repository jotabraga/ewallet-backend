import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';

export default function logIn(app, connection){
    app.post("/login", async (req, res) => {

        const { email, password } = req.body;

        try {            
            const sql = `SELECT * FROM users 
                        WHERE email = $1`;
            const userData = await connection.query(sql, [email]);        
            const user = userData.rows[0];

            if(bcrypt.compareSync(password, user?.password) && user){
            
                const token = uuid();
                const sql = `SELECT * FROM sessions
                            WHERE "userId" = $1`;
                const logged = await connection.query(sql, [user.id]);
                const stillLogged = logged.rows[0];

                if(stillLogged){  

                    return res.send({
                        name: user.name,
                        token: stillLogged.token
                    });
                }else {

                    const sql = `INSERT INTO sessions
                                ("userId", token)
                                VALUES ($1, $2)`;
                    await connection.query(sql, [user.id, token]);
                    return res.send({
                        name: user.name, 
                        token
                    });
                }

            }
        } catch (error) {
        console.log(error);
        res.sendStatus(500);
        }
    });
}
