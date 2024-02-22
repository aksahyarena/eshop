import { useSelector } from 'react-redux'
import {selectIsLoggedIn} from '../../redux/slice/authSlice'
import { useNavigate } from 'react-router-dom'


export const LoginLink = ({children}) => {
  const navigate=useNavigate();
  const isLoggedIn=useSelector(selectIsLoggedIn)
    if(isLoggedIn){
        return children
    }
  return null
  }

export const LogoutLink = ({children}) => {
  const navigate=useNavigate()
  const isLoggedIn=useSelector(selectIsLoggedIn)
  if(!isLoggedIn){
   return children
  }
  return null
}
  


