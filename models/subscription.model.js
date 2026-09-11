import mongoose from "mongoose";
import * as validator from "./global.validator.js";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Subscription name is required"],
        minLength: 1,
        maxLength: 100,
        validate: validator.validateName,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price must be greater than 0."]
    },
    currency: {
        type: String,
        enum: ["USD", "GBP", "INR", "EUR"],
        default: "INR"
    },
    frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly"],
        required: [true, "Subscription frequency is required."]
    },
    category: {
        type: String,
        enum: ["Entertainment", "Education", "Productivity", "Health & Fitness", "food", "Other"],
        default: "Other",
        required: [true, "Please select a category for the subscription"]
    },
    paymentMethod: {
        type: String,
        enum: ["Credit Card", "Debit Card", "PayPal", "Bank Transfer", "UPI", "Other"],
        default: "Credit Card",
        required: [true, "Please select a payment method for the subscription"]
    },
    status: {
        type: String,
        enum: ["active", "canceled", "expired"],
        default: "active",

    },
    startDate: {
        type: Date,
        required: true,
        validate: validator.validateStartDate
    },
    renewalDate: {
        type: Date,
        validate: validator.validateRenewalDate
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    }

}, { timestamps: true });

//Auto-calculate renewal date and auto-update status before saving schema.

subscriptionSchema.pre("save", function () {
    if (!this.renewalDate && this.startDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);

    }
    if (this.renewalDate < new Date()) {
        this.status = "expired";
    }

});

const Subscription = mongoose.models.Subscription || mongoose.model("Subscription", subscriptionSchema);

export default Subscription;