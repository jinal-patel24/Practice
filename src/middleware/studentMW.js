import { Student } from "../models/StudentModel.js";

export const studentMW = async (req, res, next) => {
    try {
        const { name, password, email, role } = req.body;
        if (!name || !password || !email || !role) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const findemail = await Student.findOne({ email });
        if (findemail) {
            return res.status(400).json({ message: "Email already exist" });
        }

        next();
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error! something went wrong"});
    }
}