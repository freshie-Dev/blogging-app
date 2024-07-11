import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

import Sidebar from "../components/sidebar/Sidebar"

const ProtectedRoutes = ({children}) => {
    const navigate = useNavigate()
    const { userInfo } = useSelector(state => state.auth);

    useEffect(() => {
        console.log(userInfo)
        if(!userInfo) {
            navigate('/login', {replace: true})
        }
    }, [navigate, userInfo])
    
    
    return(
        <>
            <Sidebar pages = {children}/>
        </>
    )
    
}

export default ProtectedRoutes