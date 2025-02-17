import jwt from "jsonwebtoken";

const refreshToken = async (req , res) => {
    const { refreshtoken } = req.body;
    if(!refreshtoken){
        return res.status(401).send({message:"Refresh Token is required"})
    }
    try {
        const verify = jwt.verify(refreshToken,process.env.SECRET_KEY)

        const newAccessToken = jwt.sign({id:verify.id},process.env.SECRET_KEY,{expiresIn:"2h"})

        res.send({ accessToken : newAccessToken })
    } catch (error) {
        res.status(401).send({message:"Invalid or expired refresh token",error})
    }
};

export default refreshToken;