import { useForm } from "react-hook-form"
import { db, auth } from "../../firebase-config"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { collection, addDoc } from "firebase/firestore"
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"
import styles from "./style.module.css"

const SignUp = () => {
  const userList = collection(db, "users")
  const [error, setError] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()
  const addUser = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (res) => {
        setError("")
        await addDoc(userList, {
          first: data.first,
          last: data.last,
          profilePicture: "",
          userId: res.user.uid,
        })
        navigate("/login")
      })
      .catch((err) => {
        setError("Sign Up info is wrong")
        console.log(err.message)
      })
  }

  return (
    <div className={styles.forReg}>
      <form className={styles.registration} onSubmit={handleSubmit(addUser)}>
        <div className={styles.titleContainer}>
          <h1 className={styles.rainbow}>Sign Up!</h1>
          <h1>👋</h1>
        </div>
        <p>{error}</p>
        <div className={styles.regInputDiv}>
          {errors.first && <p>Please write your Firstname</p>}
          <input
            type="text"
            placeholder="Firstname"
            {...register("first", { required: true })}
          />
        </div>
        <div className={styles.regInputDiv}>
          {errors.last && <p>Please write your Lastname</p>}
          <input type="text" placeholder="Lastname" {...register("last")} />
        </div>
        <div className={styles.regInputDiv}>
          {errors.email && <p>Please write your Email</p>}
          <input type="email" placeholder="Email" {...register("email")} />
        </div>
        <div className={styles.regInputDiv}>
          {errors.password && <p>Please write your Password</p>}
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
        </div>
        <div className={styles.buttons}>
          <button type="submit">Sign Up!</button>
          <button>
            <Link to="/login" className={styles.link}>
              Login
            </Link>
          </button>
        </div>
      </form>
    </div>
  )
}
export default SignUp
