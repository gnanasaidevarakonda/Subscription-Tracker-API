import User from "../models/user.model.js";
import Subscription from "../models/subscription.model.js";

// GET USERS /api/v1/users (admin only--- fetch all users).
export const getUsers = async (req, res, next) => {
    try {
        //check if requested user is admin or not.
        if (req.user.role !== "admin") {
            const error = new Error("Unauthorized Execution.");
            error.statusCode = 403;
            throw error;
        }
        const users = await User.find().select("-password");
        res.status(200).json({
            success: true,
            count: users.length,
            message: "All Users fetched succesfully",
            data: users
        });
    } catch (error) {
        next(error);
    }
};
// GET USER /api/v1/user/:id (Fetch particular user)
export const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        //find user by ID and exclude password for security reasons.
        const user = await User.findById(id).select("-password");

        //If no user exists with that ID, return 404(error).

        if (!user) {
            const error = new Error("User not Found");
            error.statusCode = 404;
            throw error;
        }

        //Security check:only allow users to view their oen profile unless they're admin.
        if (req.user._id.toString() !== user._id.toString() && req.user.role !== "admin") {
            const error = new Error("unauhorized execution.");
            error.statusCode = 403;
            throw error;
        }

        //send clean success response
        res.status(200).json({
            success: true,
            message: "user fetched succesfully",
            data: user
        });


    } catch (error) {
        next(error);
    };
};

//UPDATE USER DETAILS /api/v1/user/:id (User Name change).
export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        //check if name is given or not?
        if (!name) {
            const error = new Error("Please provide a name to Update.");
            error.statusCode = 400;
            throw error;
        }

        //security check to see actual authorization & permissions to do this change.
        if (req.user._id.toString() !== id && req.user.role !== "admin") {
            const error = new Error("Unauthorized: You can only change Your own account Name.");
            error.statusCode = 403;
            throw error;

        }

        const user = await User.findByIdAndUpdate(id, { name }, {
            returnDocument: "after",
            runValidators: true,
        }).select("-password");
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: "User Name is changed succesfully.",
            data: updateUser,
        });

    } catch (error) {
        next(error);
    }
};

//DELETE USER /api/v1/user/:id (delete user account (his own account only)).
export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (req.user._id.toString() !== id && req.user.role !== "admin") {
            const error = new Error("Unauthorized: You can only delete your own account");
            error.statusCode = 403;
            throw error;
        }
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        //cascade delete: Remove all Subscriptions associated with user too.
        await Subscription.deleteMany({ user: id });
        res.status(200).json({
            success: true,
            message: "user and asscoiated subscriptions are deleetd",

        });
    } catch (error) {
        next(error);
    }
};
