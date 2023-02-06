import { doc, getDoc, updateDoc } from "firebase/firestore"
import { useParams, useOutletContext, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { db } from "../../firebase-config"
import styles from "./style.module.css"
const PostDetails = () => {
  const { id } = useParams()
  const { user } = useOutletContext()
  const [post, setPost] = useState(null)
  const [liked, setLiked] = useState(false)
  const navigate = useNavigate()
  const getPostInfo = async () => {
    const item = doc(db, "posts", id)
    const obj = await getDoc(item)
    if (!obj._document) {
      return navigate("/profile")
    }
    if (obj.data().likes.includes(user)) {
      setLiked(true)
    }
    setPost(obj.data())
  }
  const handleLike = async () => {
    const currentPost = doc(db, "posts", id)
    let likes = [...post.likes, user]
    await updateDoc(currentPost, { likes })
    setLiked(true)
    setPost({ ...post, likes: likes })
  }
  const handleUnLike = async () => {
    const currentPost = doc(db, "posts", id)
    let temp = [...post.likes]
    temp.splice(post.likes.indexOf(user), 1)
    await updateDoc(currentPost, { likes: temp })
    setLiked(false)
    setPost({ ...post, likes: [...temp] })
  }
  useEffect(() => {
    getPostInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      {post && (
        <div className={styles.p}>
          <div className={styles.post}>
            <img src={post.photo} alt="" />
            <h3>
              {post.title} 👍{post.likes.length}
            </h3>
            {!liked ? (
              <button onClick={handleLike}>❤️</button>
            ) : (
              <button onClick={handleUnLike}>💔</button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
export default PostDetails
