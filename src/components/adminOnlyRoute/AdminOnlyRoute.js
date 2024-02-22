import React from 'react'
import { email } from '../../redux/slice/authSlice'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const AdminOnlyRoute = ({ children }) => {
  const selectEmail = useSelector(email);
  let navigate = useNavigate();
  if (selectEmail !== null) {
    if (selectEmail === "test1@gmail.com") {
      return children; 
    }
  }
    navigate("/"); 
 
}


