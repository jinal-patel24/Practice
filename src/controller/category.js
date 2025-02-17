import { Category } from "../models/CategoryModel.js";

export const addcategory = async (req, res) => {
    try {

        const category = await Category.create({ ...req.body })
        return res.status(200).json({ message: "category added" })

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error! category not added" });
    }

}

export const getcategory = async (req, res) => {
    try {

        const category = await Category.find()

        return res.status(200).json({ message: "category data founded", data: category })

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error! category data not founded" });
    }

}
