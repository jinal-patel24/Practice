import jwt from "jsonwebtoken"
import 'dotenv/config'

export const signJwt = async (payload,alg) => {
    try {
        const token = await jwt.sign(payload, process.env.JWT_SECRET,alg)
        return { success: true, token: token}
    } catch (error) {
        return { success: false, message: false}
    }
}

export const verifyJwt = async (token) => {
    try {
       const verify = jwt.verify(token, process.env.JWT_SECRET)

       return { success:true, isValid: verify};

    } catch (error) {
        return { success: false, message: false}
    }
}
