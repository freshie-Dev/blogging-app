import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js"

const protect = asyncHandler(async (req, res, next)=> {
    let token
    token = req.cookies.jwt

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            const user = await User.findOne({_id: decoded.userId}).select('-password')
            req.user = user
            next()
        } catch (error) {
            res.status(401)
            throw new Error('Not authorized, no token')    
        }

    }else {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

export {protect}