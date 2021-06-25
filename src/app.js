import customExpress from './config/customExpress.js';
import routes from './routes/routes.js';

const app = customExpress();
routes(app);

app.listen(4000, () => {
    console.log("Jota server online on port 4000");
  });

export default app;

