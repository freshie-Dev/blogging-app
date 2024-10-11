import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js"

//? desc    authenticate user & set token
//^ route   POST: /api/users/auth 
//* access  PUBLIC
const authUser = async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})

    if(user && await user.matchPassword(password)) {
        generateToken(res, user._id)
        const {_id, name, email} = user
        res.status(201).json({_id, name, email})
    } else {
        res.status(401)
        throw new Error ("Invalid credentials")
    }
}


//? desc    register user & set token
//^ route   POST: /api/users/register 
//* access  PUBLIC
const registerUser = async (req, res) => {
    const {name, email, password} = req.body;
    console.log(name, email, password)

    const usera = await User.findOne({email})
    if (usera) {
        res.status(409)
        throw new Error ("User already exists")
    }
    console.log("hello")
    const user = await User.create({
        name,
        email,
        password
    })
    console.log(user)
    if(user) {
        generateToken(res, user._id)
        const {_id, name, email} = user
        res.status(201).json({_id, name, email})
    } else {
        res.status(400)
        throw new Error ("Invalid user data")
    }
}

//? desc    logut user & delete token
//^ route   POST: /api/users/register 
//* access  PUBLIC
const logoutUser = async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({message: "Logged out"})
}


//? desc    fetch user profile
//^ route   POST: /api/users/profile 
//! access  PRIVATE
const getUserProfile = async (req, res) => {
    res.status(200).json({ message: "Fetched user profile", user: req.user })
}


//? desc    update user profile
//^ route   PUT: /api/users/profile 
//! access  PRIVATE
const updateUserProfile = async (req, res) => {
    const user = await User.findById({_id: req.user._id})
    console.log(req.body)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        console.log("password frm db",user.password)
        if (!(await user.matchPassword(req.body.password))) {
            res.status(401)
            throw new Error ("Your current password is incorrect")
        }
        // if(req.body.password && req.body.newPassword) {
        //     if (user.matchPassword(req.body.password)) {
        //         user.password = req.body.newPassword
        //     } else {
        //         throw new Error ("Your current password is incorrect")
        //     }
        // } 
        const updatedUser = await user.save();
        const updatedUserObj = updatedUser.toObject();
        delete updatedUserObj.password
        
        res.status(200).json(updatedUserObj)
    } else {
        res.status(404)
        throw new Error('User not found')
    }

}

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile }