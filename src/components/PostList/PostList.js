import { useNavigate } from "react-router-dom"
import styles from "./style.module.css"
const PostList = ({ posts }) => {
  const navigate = useNavigate()
  const postDetails = (post) => {
    navigate("/profile/post/" + post.id)
  }
  return (
    <div className={styles.posts}>
      {posts.map((post) => {
        return (
          <div className={styles.imgContainer} key={post.id}>
            <img
              className={styles.postedImg}
              onClick={() => postDetails(post)}
              src={post.photo}
              key={post.id}
              alt={post.name}
            />
            <h3 className={styles.title}>{post.title}</h3>
            <div>
              <p>👍{post.likes.length}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default PostList
