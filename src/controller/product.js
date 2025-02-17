import { Category } from "../models/CategoryModel.js";
import { Product } from "../models/ProductModel.js";

export const addproduct = async (req, res) => {
    try {

        const product = await Product.create({ ...req.body })
        return res.status(200).json({ message: "product added" })

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error! product not added" });
    }

}

export const getproduct = async (req, res) => {
    try {

        //const product = await Product.find().populate("category", "name");
        const product = await Product.find()
        const data = await Promise.all(product.map(async (item) => {

            
            const category = await Category.findById(item.category)
   
           return ({...item.toObject(), category: category.name})
               
            }))


        return res.status(200).json({ message: "product data founded", data: data })

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error! product data not founded" });
    }

}
