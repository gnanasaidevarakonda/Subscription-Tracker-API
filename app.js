//buil-in imports
import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";

//local files import
import { PORT } from "./config/.env.js"
import authRouter from "./routes/auth.router.js";
import userRouter from "./routes/user.router.js";
import subscriptionRouter from "./routes/subscription.router.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middleware/error.middleware.js";
import { globalLimiter } from "./middleware/ratelimit.middleware.js";
//import workflowRouter from "./routes/workflow.router.js";
import { startRemainderScheduler } from "./config/cron.js";




const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", globalLimiter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
//app.use("/api/v1/workflows", workflowRouter);




app.get("/", (req, res) => {
    res.send("Welcome to the Sucscription_tracker API.");
});

//error middleware.
app.use(errorMiddleware);


const serverPort = PORT

app.listen(serverPort || 5400, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);

    //connect to database

    await connectToDatabase();

    //start background cron schedular
    startRemainderScheduler();
});
export default app;
