import { Outlet, useNavigate, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../../firebase-config"
import styles from "./style.module.css"

export const AuthMiddleware = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        return navigate("/login")
      } else {
        setUser(user.uid)
      }
    })
  }, [navigate])
  return (
    user && (
      <>
        <div className={styles.forNav}>
          <nav>
            <ul>
              <li>
                <Link className={styles.link} to="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <Link className={styles.link} to="settings">
                  Settings
                </Link>
              </li>
              <li>
                <Link className={styles.link} to="search">
                  Search
                </Link>
              </li>
              <li>
                <Link className={styles.link} to="addtest">
                  Add Test
                </Link>
              </li>
              <li>
                <Link className={styles.link} to="tests">
                  Tests
                </Link>
              </li>
              <li onClick={() => signOut(auth)}>Logout</li>
            </ul>
          </nav>
        </div>
        <Outlet context={{ user }} />
      </>
    )
  )
}
