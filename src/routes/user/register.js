import Joi from "joi";
import bcrypt from "bcrypt";

export default function register(app, connection) {
  app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const sql = "select * from users where email = $1";
      const verifyExistEmail = await connection.query(sql, [email]);

      const userSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email({minDomainSegments: 2}).required(),
        password: Joi.string().required()
      });

      const verification = userSchema.validate(req.body);

      if (verification.error) {
        return res.sendStatus(400);

      } else if (verifyExistEmail.rows[0]) {
        return res.sendStatus(409);

      } else {
        const encryptedPassword = bcrypt.hashSync(password, 12);
        const sql = `
                    INSERT INTO users
                    (name, email, password) 
                    VALUES ($1, $2, $3)`;
        await connection.query(sql, [name, email, encryptedPassword]);
        res.sendStatus(201);
      }
      
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
}