import jwt from "jsonwebtoken"
const generateToken = (res, userId) => {
    const token = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1h"})
    res.cookie('jwt', token, {
        httpOnly: true, // javascript access
        secure: process.env.NODE_ENV !== "development",
        sameSite: 'strict',
        maxAge: 30*24*60*60*1000
    })
}

export default generateToken