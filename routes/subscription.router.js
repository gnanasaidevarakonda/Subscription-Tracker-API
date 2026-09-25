import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import * as subscriptions from "../controllers/subscription.controllers.js";


const subscriptionRouter = Router();

//Protect all Subscription routes with authorize middleware.
subscriptionRouter.use(authorize);

subscriptionRouter.get("/", subscriptions.getAllSubscriptions);



subscriptionRouter.get("/upcoming-renewals", subscriptions.upcomingRenewals);

subscriptionRouter.get("/user/:id", subscriptions.getUserSubscriptions);

subscriptionRouter.post("/", subscriptions.createSubscription);

subscriptionRouter.put("/:id", subscriptions.updateSubscription);


subscriptionRouter.delete("/:id", subscriptions.deleteSubscription);

subscriptionRouter.put("/:id/cancel", subscriptions.cancelSubscription);
subscriptionRouter.get("/:id", subscriptions.getUserSubscriptionDetails);




export default subscriptionRouter;

