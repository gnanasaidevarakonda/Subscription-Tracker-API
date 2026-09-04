import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import { validatePassword } from "../models/global.validator.js";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/.env.js";



export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { name, password, email } = req.body;

        //check is user is alredy existed.
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error("User alredy exist.");
            error.statusCode = 409;
            throw error;
        }

        //validating password before hashing.
        if (!validatePassword.validator(password)) {
            const error = new Error(validatePassword.message);
            error.statusCode = 400;
            throw error;
        }

        //Hashing Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //creating user.
        const newUser = await User.create([{ name, email, password: hashedPassword }], { session });

        //creating jsonwebtoken for user.
        const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        await session.commitTransaction();
        session.endSession();


        res.status(201).json({
            success: true,
            message: "user created succesfully",
            data: {
                token,
                user: newUser[0],
            }
        })
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }

};
export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        //check if email & password are provided.

        if (!email || !password) {
            const error = new Error("Please provide both email and password");
            error.statusCode = 400;
            throw error;
        }

        //find the user by email & explicitly select the password (+password).
        const user = await User.findOne({ email }).select("+password");

        //if user is not exist.
        if (!user) {
            const error = new Error("User is not Registered");
            error.statusCode = 404;
            throw error;
        }

        //verfiy password with bcrypt compare
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            const error = new Error("User Password is Invalid!");
            error.statusCode = 401;
            throw error;

        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        res.status(200).json({
            success: true,
            message: "User sign in Succesfully",
            data: {
                token,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                }
            }
        });


    } catch (error) {
        next(error);
    }
};
export const signOut = async (req, res, next) => { };
