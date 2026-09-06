import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET } from "../config/.env.js";

const authorize = async (req, res, next) => {
    try {
        let token;

        //check token is in auhtorization header.
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(' ')[1];
        }

        //checck if token is in cookies.
        else if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        // check if token is not provided and issue an Error.
        if (!token) {
            const error = new Error("Unauthorized Access: No token provided");
            error.statusCode = 401;
            throw error;
        }

        //now decode the user token.
        const decoded = jwt.verify(token, JWT_SECRET);

        //find user by decoded token.
        const user = await User.findById(decoded.userId);

        //send an error if user is not exist.
        if (!user) {
            const error = new Error("Unauthorized: User not found.");
            error.statusCode = 401;
            throw error;
        }

        req.user = user;

        next();

    } catch (error) {
        next(error);
    }
};

export default authorize;