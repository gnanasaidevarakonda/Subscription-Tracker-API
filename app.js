import express from "express"
import { PORT } from "./config/.env.js"
import authRouter from "./routes/auth.router.js";
import userRouter from "./routes/user.router.js";
import subscriptionRouter from "./routes/subscription.router.js";
import connectToDatabase from "./database/mongodb.js";




const app = express();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);


app.get("/", (req, res) => {
    res.send("Welcome to the Sucscription_tracker API.");
});

const serverPort = PORT

app.listen(serverPort || 5400, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);

    //connect to database

    await connectToDatabase();
});
export default app;
