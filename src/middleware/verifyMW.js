
import jwt from "jsonwebtoken"


export const verified = async (req, res, next) => {
    try {
        
        const token = req.headers.authorization
        
        if (!token) {
            return res.status(401).json({ message: "unauthorized" })
        }
        const verify = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = verify;
        next()
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Invalid Token", data: {} })
    }
}