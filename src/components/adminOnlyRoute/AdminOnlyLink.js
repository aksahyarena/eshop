import React from 'react'
import { useSelector } from 'react-redux'
import {email, isAdminOrNOt, isAdminOrNot} from '../../redux/slice/authSlice';
import Permission from '../Permission';
import { useNavigate } from 'react-router-dom';

const AdminOnlyLink = ({children}) => {
  const navigate=useNavigate()
    const isAdmin=useSelector(isAdminOrNot)
    if(isAdmin){
      return children
    }
  }
  
  export default AdminOnlyLink 