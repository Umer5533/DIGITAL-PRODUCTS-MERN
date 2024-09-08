import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {type: String, required: true},
    priceInCents: {type: Number, required: true },
    image: {type: String, required: true},
    description:{type: String, required: false},
    categories: {type: String, required: true,
                enum: ["course", "template"],
    },
})

export const Product = mongoose.model("Product", productSchema)