import { Student } from "../models/StudentModel.js";
import bcrypt from 'bcrypt'
import { signJwt } from "../services/jwt.js";

export const addstudent = async (req, res) => {
    try {

        const { password } = req.body;
        const hashedPAssword = await bcrypt.hash(password, 10)
        const student = new Student({ ...req.body, password: hashedPAssword })
        await student.save();

        return res.status(200).json({ message: "Student added", data: student })

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error! student not added" });
    }

}

export const loginstudent = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields required!" });
        }

        const findstudent = await Student.findOne({ email });

        if (!findstudent) {
            return res.status(400).json({ message: "Student not exist..." })
        }
        const isverified = await bcrypt.compare(password, findstudent.password);

        if (isverified) {   
            const verified = await signJwt({ name: findstudent.name, id: findstudent._id }, { algorithm: 'HS256' })
           
            if (verified.success) {
                return res.status(200).json({ message: "student found", token: verified.token })
            }
            else {
                return res.status(500).json({ message: "Error in sign token" });
            }
        }

        return res.status(409).json({ message: "Invalid Email or Passowrd! " });

    } catch (error) {
        return res.status(500).json({ message: "login not successfully done..." })
    }
}

export const getstudent = async (req, res) => {
    try {

        const student = await Student.find()

return res.status(200).json({ message: "student found", data: student })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const deletestudent = async (req, res) => {
    try {

        const { email } = req.body;

        const student = await Student.findOne({ email });

        if (!student) {
            return res.status(400).json({ message: "Student not found..." })
        }

        await Student.deleteOne({ email });
        return res.status(200).json({ message: "student deleted..." })


    } catch (error) {
        return res.status(500).json({ message: "login not successfully done..." })
    }
}

export const updatestudent = async (req, res) => {
    try {

        const { email, name } = req.body;

        const student = await Student.findOneAndUpdate({ email }, { name: name })
        if (!student) {
            return res.status(400).json({ message: "Student not found..." })
        }

        return res.status(200).json({ message: "Student updated...", data: student })

    } catch (error) {
        return res.status(500).json({ message: "Internal server error..." })
    }
}