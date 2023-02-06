import { useOutletContext } from "react-router-dom"
import styles from "./style.module.css"
import { useEffect, useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebase-config"
import Gallery from "../../components/Gallery/Gallery"
const Profile = () => {
  const { user } = useOutletContext()
  const [account, setAccount] = useState(null)
  const userList = collection(db, "users")
  const defaultPicture =
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  const getUserProfile = async () => {
    const q = query(userList, where("userId", "==", user))
    const info = await getDocs(q)
    if (info.size > 0) {
      const obj = info.docs[0]
      setAccount({ ...obj.data(), id: obj.id })
    }
  }
  useEffect(() => {
    getUserProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <div className={styles.grid}>
        {!account ? (
          <p style={{ color: "black" }}>Please wait loading...</p>
        ) : (
          <div className={styles.forProfile}>
            <div>
              <img
                className={styles.profilePic}
                src={
                  account.profilePicture
                    ? account.profilePicture
                    : defaultPicture
                }
                alt="Profile"
              />
              <h1>{account.firstname}</h1>
              <h1>{account.lastname}</h1>
            </div>
          </div>
        )}
        <Gallery />
      </div>
    </>
  )
}
export default Profile
