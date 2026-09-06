import { Router } from "express";
import { signIn, signUp, signOut } from "../controllers/auth.controllers.js";
import { authLimiter } from "../middleware/ratelimit.middleware.js";


const authRouter = Router();

authRouter.post("/sign-up", authLimiter, signUp);

authRouter.post("/sign-in", authLimiter, signIn);

authRouter.post("/sign-out", signOut);


export default authRouter;

