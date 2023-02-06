import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore"
import { db } from "../../firebase-config"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import styles from "./style.module.css"
import PostList from "../PostList/PostList"
const Account = () => {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const { id } = useParams()
  const navigate = useNavigate()
  const postList = collection(db, "posts")
  const defaultPic = "https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
  const getPosts = async (id) => {
    const items = await getDocs(query(postList, where("userId", "==", id)))
    setPosts(
      items.docs.map((elm) => {
        return {
          ...elm.data(),
          id: elm.id,
        }
      })
    )
  }
  const getUser = async () => {
    const docRef = doc(db, "users", id)
    const obj = await getDoc(docRef)
    if (!obj._document) {
      return navigate("/profile/search")
    }
    getPosts(obj.data().userId)
    setUser({ ...obj.data(), id: obj.id })
  }
  useEffect(() => {
    getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      {!user ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.grid}>
          <div className={styles.guestProfile}>
            <img src={user.profilePicture || defaultPic} alt="" />
            <h3>
              {user.first} {user.last}
            </h3>
          </div>
          <PostList posts={posts} />
        </div>
      )}
    </div>
  )
}
export default Account
