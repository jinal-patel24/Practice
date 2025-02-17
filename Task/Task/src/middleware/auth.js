import jwt from "jsonwebtoken";

// middleware to authenticate JWT token
const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({ message: "Token is required" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.studentId = decoded.id;
        next();
    } catch (err) {
        res.status(401).send({ message: "Invalid Token" });
    }
};

export default authenticate;
