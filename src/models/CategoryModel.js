import mongoose from "mongoose";


const categorySchema = mongoose.Schema({
    name: {type: String},

});



export const Category = mongoose.model("category",categorySchema)