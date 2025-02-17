import jwt from "jsonwebtoken";
import Student from "../models/studentModel.js";

const validateJWT = async (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).send({ message: "Access Denied: No token provided" });
    }

    try {
        const verify = await jwt.verify(token, process.env.SECRET_KEY);
        const student = await Student.findOne({ _id: verify.id });

        if (!student) {
            return res.status(401).json({ message: "Invalid Token!" });
        }

        req.headers.student = student;
        next();
    } catch (error) {
        console.log("JWT error == ", error.message);

        if (error.name === "TokenExpiredError") {
            return res.status(401).send({ message: "Token has expired" });
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).send({ message: "Invalid token" });
        }

        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

export default validateJWT ;
