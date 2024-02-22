import React, { useState } from 'react'
import resetImg from '../../assets/forgot.png'
import styles from './auth.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../../components/card/Card'
import { toast } from 'react-toastify'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../firebase/config'
import Loader from '../../components/loader/Loader'
const Reset = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("")

  const navigate = useNavigate()
  const handleReset = (e) => {
    setEmail(e.target.value);
    console.log(email)
  }

  const handleResetPasswordSubmit = (e) => {
    e.preventDefault()

    setIsLoggedIn(true)
    
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoggedIn(false)
        toast.success("Password Reset succefully . Please check your mail box ")
        navigate("/")
        // ..
      })
      .catch((error) => {
        const errorMessage = error.code
        setIsLoggedIn(false)
        toast.error(errorMessage.substr("5").toUpperCase().split("-").join(" "))
        // ..
      });
  }
  return (
    <>
      {isLoggedIn && <Loader />}
      <section className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <h2>Reset</h2>
            <form onSubmit={handleResetPasswordSubmit}>
              <input type="email" placeholder="Email" required value={email} onChange={handleReset} />
              <button type="submit" className="--btn --btn-primary --btn-block">Reset Password</button>


            </form>
            <span className={styles.register}>
              <p>Already have an account ? </p>
              <Link to="/login">Login</Link>
            </span>
          </div>
        </Card>
        <div className={styles.img}>
          <img src={resetImg} alt={resetImg} width="400" />
        </div>


      </section>
    </>
  )
}

export default Reset
