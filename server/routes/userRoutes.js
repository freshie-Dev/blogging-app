import express from "express"
import asyncHandler from "express-async-handler"
const router = express.Router()

import { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile } from "../controllers/userController.js"
import { protect } from "../middleware/authMiddleware.js"


router.get('/', (req, res) => {
    console.log("hello")
    res.status(200).send("hello")
})

router.get('/verify_token', protect, (req, res) => {
    res.status(200).send("token verified")
})

router.post('/auth', asyncHandler(authUser))

router.post('/register',  asyncHandler(registerUser))

router.post('/logout',  asyncHandler(logoutUser))

router.route('/profile')
    .get( protect, asyncHandler(getUserProfile))
    .put( protect, asyncHandler(updateUserProfile))

export default router