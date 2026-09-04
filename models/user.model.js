
import mongoose from "mongoose";
import * as validators from "./global.validator.js";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User name is required."],
        trim: true,
        minLength: 3,
        maxLength: 100,
        validate: validators.validateFullName,
    },
    email: {
        type: String,
        required: [true, "E-mail is required."],
        lowercase: true,
        unique: true,
        trim: true,
        maxLength: 254,
        validate: validators.validateEmail,
    },
    password: {
        type: String,
        required: [true, "user password is required."],
        minLength: 8,
        select: false, //prevent password hash from leaking into queries.



    }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;