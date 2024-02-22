import React, { useState } from 'react'
import styles from './auth.module.scss'
import regImg from '../../assets/register.png'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../../components/card/Card'
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader'
import { auth } from '../../firebase/config'
import { addUser } from '../../services/api'
import {registerUserParams} from '../../utils/registerUserParams'
const Register = () => {
  const [formData, setFormData] = useState(registerUserParams)

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  const handleRegister = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }
  const registerUser = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.cPassword) {
      toast.error("Confirm Password do not match");
      setIsLoggedIn(true);
    }
    setIsLoggedIn(true);
    const response = await addUser(formData);
    setIsLoggedIn(false);
    toast.success("User addedd successfully");
    setFormData((prevData) => ({ ...prevData, ...registerUserParams}))
    navigate("/login")
  }
  return (
    <>
      {isLoggedIn && <Loader />}

      <section className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <h2>Register</h2>
            <form onSubmit={registerUser}>
              <input type="text" placeholder="Email" required
                name="email" value={formData.email} onChange={handleRegister}
              />
              <input type="password" placeholder="Password" required
                name="password" value={formData.password} onChange={handleRegister}
              />
              <input type="password" placeholder="Confirm Password" required
                name="cPassword" value={formData.cPassword} onChange={handleRegister}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">Register</button>


            </form>
            <div className={styles.links}>
              <p>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        </Card>
        <div className={styles.img}>
          <img src={regImg} alt={regImg} width="400" />
        </div>


      </section>
    </>
  )
}

export default Register
