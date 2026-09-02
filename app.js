import express from "express"
import { PORT } from "./config/.env.js"

const app = express();

app.get("/", (req, res) => {
    res.send("Welcome to the Sucscription_tracker API.");
});

const serverPort = PORT

app.listen(serverPort || 5400, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

});
export default app;
