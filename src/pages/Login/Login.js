import { useForm } from "react-hook-form"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase-config"
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"

import styles from "./style.module.css"
const Login = () => {
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const handleLogin = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        console.log(res)
        navigate("/profile")
      })
      .catch((err) => {
        setError("Auth info is wrong")
        console.log(err.message)
      })
  }
  return (
    <div className={styles.forLog}>
      <form className={styles.login} onSubmit={handleSubmit(handleLogin)}>
        <div className={styles.titleContainer}>
          <h1 className={styles.rainbow}>Login</h1>
          <h1>😊</h1>
        </div>
        <p>{error}</p>
        <div className={styles.logInputDiv}>
          {errors.email && <p>Please write your Email</p>}
          <input type="email" placeholder="Email" {...register("email")} />
        </div>
        <div className={styles.logInputDiv}>
          {errors.password && <p>Please write your Password</p>}
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
        </div>
        <div className={styles.buttons}>
          <button type="submit">Login</button>
          <button>
            <Link className={styles.link} to="/">
              Sign Up
            </Link>
          </button>
        </div>
      </form>
    </div>
  )
}
export default Login
