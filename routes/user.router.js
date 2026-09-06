import { Router } from 'express';
import authorize from '../middleware/auth.middleware.js';
import * as users from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.get("/", authorize, users.getUsers);

userRouter.get("/:id", authorize, users.getUser);

//userRouter.post("/", (req, res) => res.send({ title: "CREATE a user" }));

userRouter.put("/:id", authorize, users.updateUser);

userRouter.delete("/:id", authorize, users.deleteUser);

export default userRouter;
