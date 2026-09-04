const errorMiddleware = (err, req, res, next) => {
    try {
        let error = { ...err };
        error.message = err.message;
        console.error(err);

        // Mangoose bad objectID error.
        if (err.name == "CastError") {
            const message = "Resource not Found.";
            error = new Error(message);
            error.statusCode = 404;

        }

        // Mangoose duplicate key.
        if (err.code == 11000) {
            const message = "Duplicate field value entered.";
            error = new Error(message);
            error.statusCode = 400;
        }

        // Mangoose Validation Error.
        if (err.name == "ValidationError") {
            const message = Object.values(err.errors).map((val) => val.message).join(", ");
            error = new Error(message);
            error.statusCode = 400;
        }

        // Json Web Token (JWT) Authorization Errors.
        //JWT invalid token.
        if (err.name === "JsonWebTokenError") {
            const message = "Invalid Token Authorization denied.";
            error = new Error(message);
            error.statusCode = 401;
        }

        //JWT Expired error.
        if (err.name === "TokenExpiredError") {
            const message = "Token has expired. Please sign-in again.";
            error = new Error(message);
            error.statusCode = 401;
        }

        res.status(error.statusCode || 500).json({ success: false, error: error.message || "Server Error" });
    } catch (error) {
        next(error);
    }
}

export default errorMiddleware;