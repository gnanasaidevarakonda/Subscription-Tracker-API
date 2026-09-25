import cron from "node-cron";
import { checkAllSubscriptions } from "../utils/remainder.service.js";

export const startRemainderScheduler = () => {

    //optoin A:For testing right now, run automatically every minute:

    /*cron.schedule("* * * * *", async () => {
        await checkAllSubscriptions();
    });*/

    //option B: For production(runs every day at 9:00 AM), the syntax is:
    cron.schedule("0 9 * * *", async () => {
        await checkAllSubscriptions();
    }, {
        timezone: "Asia/Kolkata" //Guarantees 9:00AM IST regardless of server host location
    });

    console.log("⏰ Automated Reminder Scheduler is active and running!");
};