import mongoose from "mongoose";


const productSchema = mongoose.Schema({
    name: {type: String},
    price: {
        type: Number,
        default: 50
    },
    stock: {
        type: Number,
        default: 5
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    }
    
});



export const Product = mongoose.model("product", productSchema)