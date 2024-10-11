import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';  // To read cookies
import axios from 'axios';

const AuthRedirect = ({ children }) => {
  const navigate = useNavigate();
  const { userInfo } = useSelector(state => state.auth);
  const token = Cookies.get('jwt');  // Get the JWT token from the cookies

  useEffect(() => {
    const verifyToken = async ()=> {
      const response = await axios.get('/api/users/verify_token')
      if (response.status === 200) navigate('/')
    }
    verifyToken()
  }, [userInfo, token, navigate]);

  // If the user is not logged in, render the children (which is the LoginPage)
  return <>{children}</>;
};

export default AuthRedirect;
