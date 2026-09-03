import mongoose from "mongoose";

import { DB_URI, NODE_ENV } from "../config/.env.js";

if (!DB_URI) {
    throw new Error("please define the MongoDB_URI in environmental variables .env.<development/production>.local files");
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);

        console.log(`Database is connected in ${NODE_ENV} mode`);
    } catch (error) {
        console.error("Error in Database connection", error);

        process.exit(1);
    }
}

export default connectToDatabase;