import React,{ useEffect, useState } from 'react'
import styles from './Header.module.scss'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaCartPlus, FaBars, FaWindowClose, FaUserCircle } from 'react-icons/fa'
import { auth } from '../../firebase/config'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { toast } from 'react-toastify'
import Loader from '../loader/Loader'
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER, email, selectIsLoggedIn } from '../../redux/slice/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { LoginLink, LogoutLink } from '../hiddenLinks/hiddenLInks'
import AdminOnlyLink from '../adminOnlyRoute/AdminOnlyLink'
import { checkUserAuth, userSignedOff } from '../../services/api'
const logo = (

  <div className={styles.logo}>
    <NavLink to='/'>
      e<span>Shop</span>.
    </NavLink>
  </div>


)

var activeLink = (
  ({ isActive }) => (isActive ? styles.activeLink : "")
)
const cartMenu = (
  <NavLink to="/cart" className={activeLink}>Cart <FaCartPlus size={20} />
    <p className={styles.noofitems}>0</p></NavLink>
)

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const isLoggedIn=useSelector(selectIsLoggedIn);
  const [displayName, setDisplayName] = useState("");
  const loggeInUSerEmail=useSelector(email)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkUser = async () => {
    const loggedUser = await checkUserAuth();
    const { SesEmail, SesID,isAdmin } = loggedUser.data;
    if (SesEmail && SesID) {
      dispatch(SET_ACTIVE_USER({SesEmail,SesID,isAdmin}))
      setDisplayName(SesEmail);
    }
    else {
      setDisplayName("");
    }
  }
  useEffect(() => {
    checkUser();
  }, [dispatch, displayName])


  const shwomenuFunc = () => {
    setShowMenu(!false)
  }
  const hideMenu = () => {
    setShowMenu(false)
  }

  const logoutUser = async() => {
    try {
      const response=await userSignedOff();
      console.log("www",response)
      dispatch(REMOVE_ACTIVE_USER());
      navigate("/");
      toast.success("User Logout SUccessfully");
    } catch (error) {
      console.log(error)
      const errorMessage = error.code;
      toast.error(errorMessage.substr("5").toUpperCase().split("-").join(" "))
    }
  
  }
  return (
    <>
      {/* {isLoggedIn && <Loader />} */}
      <div className={styles.header}>
        {logo}
        <nav className={showMenu ? styles["header-mobile-open"] : styles["header-hide"]}>
          <ul onClick={hideMenu}>

            <li>
              <AdminOnlyLink>

                <Link to="/admin/home">
                  <button className="--btn --btn-primary">Admin</button>
                </Link>
              </AdminOnlyLink>
            </li>

            <li>
              <LoginLink>
                <a href="javascript:void(0)"><FaUserCircle /> Hi {loggeInUSerEmail}</a>
              </LoginLink>
            </li>

            <li><NavLink to='/' className={activeLink}>Home</NavLink></li>
            <li><NavLink to='/contact' className={activeLink}>Contact</NavLink></li>
            <li>
              <LogoutLink>
                <NavLink className={activeLink} to="/login">Login</NavLink>
              </LogoutLink>
            </li>
            {!isLoggedIn && 
            <li> <NavLink className={activeLink} to='/register'>Register</NavLink></li>
          }
            <li>
              <LoginLink>
                <NavLink className={activeLink} to="/myorder">My Orders</NavLink>
              </LoginLink>
            </li>
            <li>

              <LoginLink>
                <NavLink className={activeLink} onClick={logoutUser}>Logout</NavLink>
              </LoginLink>
            </li>
            <li className={styles["hidden-xs"]}> {cartMenu}</li>
          </ul>

        </nav>
        <ul className={styles["header-right", "visible-xs"]}>
          <li >
            {cartMenu}
          </li>
          <li className={styles["toggle-menu"]}>{showMenu ? <FaWindowClose style={{color:"#fff"}} onClick={hideMenu} /> : <FaBars style={{color:"#fff"}} onClick={shwomenuFunc} />}</li>
        </ul>
      </div>
    </>
  )
}

export default Header
