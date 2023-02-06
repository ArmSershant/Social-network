import styles from "./style.module.css"
import AddPost from "../AddPost/AddPost"
import PostList from "../PostList/PostList"
import { collection, getDocs, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { db } from "../../firebase-config"
const Gallery = () => {
  const postList = collection(db, "posts")
  const { user } = useOutletContext()
  const [posts, setPosts] = useState([])
  const [showWindow, setShowWindow] = useState(false)
  const getPosts = async () => {
    const items = await getDocs(query(postList, where("userId", "==", user)))
    setPosts(
      items.docs.map((elm) => ({
        ...elm.data(),
        id: elm.id,
      }))
    )
  }
  useEffect(() => {
    getPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className={styles.gallery}>
      <h2 className={styles.title}>My Album</h2>
      <button
        onClick={() => {
          setShowWindow(!showWindow)
        }}
      >
        {showWindow ? "Close" : "Open"}
      </button>
      {showWindow && <AddPost />}
      <PostList posts={posts} />
    </div>
  )
}
export default Gallery
