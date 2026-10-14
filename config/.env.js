import { config } from "dotenv";

config();

export const {
    PORT, NODE_ENV,
    DB_URI,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    ADMIN_kEY,
    EMAIL_ACCOUNT,EMAIL_PASSWORD,
} = process.env;