import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";

const subscriptionRouter = Router();

//Protect all Subscription routes with authorize middleware.
subscriptionRouter.use(authorize);

subscriptionRouter.get("/", (req, res) => res.send({ title: "GET all Subscriptions" }));

subscriptionRouter.get("/:id", (req, res) => res.send({ title: "GET Subscription details" }));


subscriptionRouter.get("/user/:id", (req, res) => res.send({ title: "GET all user Subscriptions" }));

subscriptionRouter.post("/", (req, res) => res.send({ title: "CREATE a user Subscription" }));

subscriptionRouter.put("/:id", (req, res) => res.send({ title: "UPDATE Subscription" }));


subscriptionRouter.delete("/:id", (req, res) => res.send({ title: "DELETE user Subscription" }));

subscriptionRouter.put("/:id/cancel", (req, res) => res.send({ title: "CANCEL Subscription" }));

subscriptionRouter.get("/upcoming-renewals", (req, res) => res.send({ title: "upcoming renewals Subscription" }));



export default subscriptionRouter;

