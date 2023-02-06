import { useState, useRef } from "react"
import { collection, addDoc } from "firebase/firestore"
import { storage, db } from "../../firebase-config"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { useOutletContext } from "react-router-dom"
import styles from "./style.module.css"

const AddPost = () => {
  const postList = collection(db, "posts")
  const [text, setText] = useState("")
  const [loading,setLoading] = useState(false)
  const { user } = useOutletContext()
  const photoRef = useRef()
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    const file = photoRef.current.files[0]
    if (!file) {
      return
    }
    const storageRef = ref(storage, `posts/${Date.now() + file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on("state_changed", null, null, () => {
      console.log("Posted...")
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        await addDoc(postList, {
          userId: user,
          photo: downloadURL,
          title: text,
          likes: [],
        })
        setText("")
        photoRef.current.value = ""
        setLoading(false)
      })
    })
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.uploadForm}>
        <input
          className={styles.postText}
          placeholder="What's on your mind"
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          required
        />
        <label htmlFor="inputFile">
          Select Image
          <input
            id="inputFile"
            className={styles.fileInput}
            type="file"
            ref={photoRef}
          />
        </label>
        <div>
          <button disabled={loading} type="submit">Post!</button>
        </div>
      </form>
    </div>
  )
}
export default AddPost
