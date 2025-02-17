import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).send({ message: "Access denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.studentId = decoded.Id;
        next();
    } catch (err) {
        res.status(401).send({ message: "Invalid token" });
    }
};

export { authenticate };
