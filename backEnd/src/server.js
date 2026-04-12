import { env } from "./config/config.js";
import app from "./app.js";


app.listen(env.PORT, () => {
    console.log(`Server running at http://localhost:${env.PORT}`);
});