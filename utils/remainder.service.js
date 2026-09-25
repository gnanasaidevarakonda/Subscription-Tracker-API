import dayjs from "dayjs";
import Subscription from "../models/subscription.model.js";
import { sendEmailRemainder } from "./send-email.js";

//Remaiders Checkpoints.
const REMAINDERS = [7, 5, 2, 1];

//check subscriptons and sends an alert if remainder is today
export const checkSubscriptionRemainder = async (subscription) => {
    try {
        if (!subscription || subscription.status !== "active") return;

        //Ensure user details(name, email) are loaded.
        let populatedSub = subscription;
        if (!subscription.user?.email) {
            populatedSub = await Subscription.findById(subscription._id).populate("user", "name email");

        }
        if (!populatedSub || !populatedSub.user?.email) return;

        const today = dayjs().startOf("day");
        const renewalDate = dayjs(populatedSub.renewalDate).startOf("day");

        //calculate days between renewal and today
        const daysUntilRenewal = renewalDate.diff(today, "day");

        //If today matches 7,5,2 or 1 day before renewals
        if (REMAINDERS.includes(daysUntilRenewal)) {

            //check 1: If alert alredy sent for this remainder checkpoint, SKIP.
            if (populatedSub.remaindersSent && populatedSub.remaindersSent.includes(daysUntilRenewal)) {
                return;
            }
            console.log(`⏰ Sending ${daysUntilRenewal}-day reminder email to ${populatedSub.user.email} for ${populatedSub.name}...`);

            await sendEmailRemainder({
                to: populatedSub.user.email,
                type: `${daysUntilRenewal} days before renewal`,
                subscription: populatedSub,
            });

            //CHECK 2: Record in MongoDB so it NEVER sends it again for this checkpoint
            await Subscription.findByIdAndUpdate(populatedSub._id, {
                $addToSet: { remaindersSent: daysUntilRenewal }
            });

            console.log(`✅ Recorded ${daysUntilRenewal}-day reminder as sent!`);
        }
    } catch (error) {
        console.error("Error checking subscription remainder:", error);
    }
};

//Checks ALL Active Subsriptions in mongoDB.
export const checkAllSubscriptions = async () => {
    try {
        console.log("🔍 Checking all active subscriptions for upcoming renewals...");
        const activeSubscriptins = await Subscription.find({ status: "active" }).populate("user", "name email");

        for (const sub of activeSubscriptins) {
            await checkSubscriptionRemainder(sub);
        }
    } catch (error) {
        console.error("Error running automated remainder check", error);
    }
};