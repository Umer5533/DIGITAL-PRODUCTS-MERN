import express from "express";
import { Subscribers } from "../Models/subscriberModel.js";

const router = express.Router();

router.post('/', async (req, res)=>{
    const {email} =req.body;

    try {
        const newSubscriber = await Subscribers.create({email});
        res.status(201).send(newSubscriber);
    } catch (error) {
        res.status(400).send('Error subscribing: ' + error.message)
    }
})

export default router;