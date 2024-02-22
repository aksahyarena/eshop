import React, { useState } from 'react'
import styles from './auth.module.scss'
import loginImg from '../../assets/login.png'
import { FaGoogle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../../components/card/Card'
import { GoogleAuthProvider, getRedirectResult, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth } from '../../firebase/config'
import authSlice, { SET_ACTIVE_USER, email, isAdminOrNot, selectIsLoggedIn } from '../../redux/slice/authSlice'
import Loader from '../../components/loader/Loader'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { authenticateUser, checkUserAuth } from '../../services/api'
import { loginUserParams } from '../../utils/registerUserParams'

const Login = () => {
  const [FormData, setFormData] = useState(loginUserParams);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const stateIsAdmin = useSelector(isAdminOrNot);
  const userLoggedInEmail = useSelector(email)


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const checkUser = async () => {
    const loggedUser = await checkUserAuth();
    const { SesEmail, SesID,isAdmin } = loggedUser.data;
    if (SesEmail && SesID) {
      dispatch(SET_ACTIVE_USER({ SesEmail, SesID,isAdmin })) 
    }
  }
  
  const handleuseLogin = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const UserLogin = async (e) => {
    e.preventDefault();
    try {
      const getresponse = await authenticateUser(FormData)
      if (getresponse.status === 200) {
        checkUser();
        if(getresponse.data.isAdmin){
          navigate ("/admin/home")
        }
       else{
        navigate("/");
       }
      }
    } catch (error) {
      console.log(error)
    }
  }


  // Google Sigin in
  const signInWithGoogle = (e) => {
    const provider = new GoogleAuthProvider();
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        navigate('/')
        toast.success("User Logged In Successfully")

      }).catch((error) => {
        toast.error(error)
        // ...
      });
  }
  return (

    <>
      {/* {isLoggedIn && <Loader />} */}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt={loginImg} width="400" />
        </div>

        <Card>
          <div className={styles.form}>
            <h2>Login</h2>
            <form onSubmit={UserLogin}>
              <input type="text" placeholder="Email" required
                name="email" value={FormData.email} onChange={handleuseLogin}
              />
              <input type="password" placeholder="Password" required name="password"
                value={FormData.password} onChange={handleuseLogin} />

              <button className="--btn --btn-primary">Login</button>
              <div className={styles.link}>
                <Link to="/reset">Reset Password</Link>
              </div>
              <p>-- OR --</p>
            </form>
            <button type="button" onClick={signInWithGoogle} className="--btn --btn-danger --btn-block"><FaGoogle />Login with Google</button>
            <span className={styles.register}>
              <p>Don't have an account ? </p>
              <Link to="/register">Register</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  )
}

export default Login

