import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../slices/auth/authSlice'
import { useEffect } from 'react'

const ProfilePage = () => {
    const dispatch = useDispatch()
    const {userInfo, error, loading} = useSelector(state => state.auth)
    const [profile, setProfile] = useState({
        name: userInfo?.name,
        email: userInfo?.email,
        password: '',
        newPassword: ''
    })
    const handleChange = (e)=> {
        const {name, value} = e.target
        setProfile(preVal => ({...preVal, [name]: value}))
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await dispatch(updateUser(profile))
        console.log(response.payload)
    }

    useEffect(() => {
        console.log(profile)
    }, [profile])
    
  return (
    <form onSubmit={handleSubmit}>
        <input type="text" name='name' value={profile.name}  onChange={handleChange} /> <br />
        <input type="text" name='email' value={profile.email} onChange={handleChange} /> <br />
        <input placeholder='Current Password' type="password" name='password' value={profile.password} onChange={handleChange} /> <br />
        <input placeholder='New Password' type="password" name='newPassword' value={profile.newPassword} onChange={handleChange} /> <br />
        <button type='submit'>Submit</button>
        {error && <p>{error}</p>}
    </form>
  )
}

export default ProfilePage