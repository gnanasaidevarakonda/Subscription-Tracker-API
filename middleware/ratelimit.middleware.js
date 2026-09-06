import ratelmiter, { rateLimit } from "express-rate-limit";

//genral limit for API calls.
export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: true,
        error: "Too many reqests from this IP, please try again in 15 minutes",

    }
});

// general limiter fro auth routes(sign-in & sign-up).
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: true,
        error: "Too many login attempts. Please try again in 15 minutes."
    }
});