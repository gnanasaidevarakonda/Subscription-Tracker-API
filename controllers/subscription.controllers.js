import Subscription from "../models/subscription.model.js";
import { addDays } from "date-fns";

//1. GET api/v1/subscriptions(Admin Only: Fetch all subscriptions)

export const getAllSubscriptions = async (req, res, next) => {
    try {
        //check for admin privileges
        if (req.user.role !== "admin") {
            const error = new Error("Unauthorized: Admin privileges are required.");
            error.statusCode = 403;
            throw error;
        }
        const subscriptions = await Subscription.find().populate("user", "email");
        res.status(200).json({
            success: true,
            count: subscriptions.length,
            data: subscriptions
        });
    } catch (error) {
        next(error);
    }
};

//2. GET api/v1/subscriptions/:id (get ALL subscriptions for logged-in user.)
export const getUserSubscriptions = async (req, res, next) => {
    try {
        const { id } = req.params;

        // check if execution done by same user or not.
        if (req.user._id.toString() !== id && req.user.role !== "admin") {
            const error = new Error("Unauthorized: You can only view your own subscriptions.");
            error.statusCode = 403;
            throw error;
        }

        const subscriptions = await Subscription.find({ user: id });
        res.status(200).json({
            success: true,
            count: subscriptions.length,
            data: subscriptions,
        });
    } catch (error) {
        next(error);
    }
};

//3. GET /api/v1/subscriptions/:id (FETCH single subscription details).
export const getUserSubscriptionDetails = async (req, res, next) => {
    try {
        const { id } = req.params;

        //check if subscription is existed or not.
        const subscription = await Subscription.findById(id);
        if (!subscription) {
            const error = new Error("Subscription not found");
            error.statusCode = 404;
            throw error;
        }

        //check if it's same user or not
        if (subscription.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            const error = new Error("Unauthorized: You do not own the subscription.");
            error.statusCode = 403;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: "User Subscription Details.",
            data: subscription
        });
    } catch (error) {
        next(error);
    }
};

// POST /api/v1/subscriptions (CREATE subscription for logged-in user).
export const createSubscription = async (req, res, next) => {
    try {
        //creates a subcription for user.
        const subcription = await Subscription.create({
            ...req.body,
            user: req.user.id
        });
        res.status(201).json({
            success: true,
            message: "subscription created successfully",
            data: subcription
        });
    } catch (error) {
        next(error);
    }
};

//PUT /api/v1/subscriptions/:id (UPDATE Subscriptions for logged-in user).
export const updateSubscription = async (req, res, next) => {
    try {
        const { id } = req.params;

        //check if subscription is exist or not.
        const subscription = await Subscription.findById(id);
        if (!subscription) {
            const error = new Error("Subscription not found.");
            error.statusCode = 404;
            throw error;
        }
        if (subscription.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            const error = new Error("Unauthorized: You can only change your own subscription");
            error.statusCode = 403;
            throw error;
        }
        Object.assign(subscription, req.body);

        //if it's freqency or start date was changed clear renewal date so pre("save") will recalcute it!.
        if (req.body.frequency || req.body.startDate) {
            subscription.renewalDate = undefined;
        }

        //using the save so that pre('save') hooks and validators run.

        const updatedSubscription = await subscription.save();

        res.status(200).json({
            success: true,
            message: "Subscription updated succesfully",
            data: updatedSubscription
        });
    } catch (error) {
        next(error);
    }
};

//DELETE /api/v1/subscriptions/:id (DELETE logged-in User Subscription).
export const deleteSubscription = async (req, res, next) => {
    try {
        const { id } = req.params;

        //check is subscription actually exist or not.
        const subscription = await Subscription.findById(id);
        if (!subscription) {
            const error = new Error("Subscription not found");
            error.statusCode = 404;
            throw error;
        }

        //check for authorization and admin previlages.
        if (subscription.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            const error = new Error("Unauthorized: you can only delete your own subscription.");
            error.statusCode = 403;
            throw error;
        }

        await Subscription.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Subscription deleted succesfully",

        });
    } catch (error) {
        next(error)
    }
};

//PUT /api/v1/subscription/:id/cancel (CANCEL the user subscription.)
export const cancelSubscription = async (req, res, next) => {
    try {
        const { id } = req.params;
        const subscription = await Subscription.findById(id);

        //check if subscription is actually exist or not.
        if (!subscription) {
            const error = new Error("Subscription not found");
            error.statusCode = 404;
            throw error;
        }

        // Ownership & Authorization check.
        if (subscription.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            const error = new Error("Unauthorized:You do not own this subscription");
            error.statusCode = 403;
            throw error;
        }

        subscription.status = "canceled";
        await subscription.save();

        res.status(200).json({
            success: true,
            message: "Subscription cancelled successfully",
            data: subscription
        });
    } catch (error) {
        next(error);
    }
};

//GET /api/v1/subscription/:id/upcoming-renewals (GET Next Upcoming renewals.)
export const upcomingRenewals = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find({
            user: req.user._id,
            status: "active",
            renewalDate: {
                $gte: new Date(),
                $lte: addDays(new Date(), 7)
            }
        }).sort({ renewalDate: 1 });

        res.status(200).json({
            sucess: true,
            count: subscriptions.length,
            data: subscriptions
        });
    } catch (error) {
        next(error);
    }
};