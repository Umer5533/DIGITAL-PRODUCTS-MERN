import mongoose from "mongoose";

const subscriptionSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true}
})

export const Subscribers = mongoose.model("Subscribers", subscriptionSchema)