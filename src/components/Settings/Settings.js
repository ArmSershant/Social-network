import { useRef } from "react"
import { db, storage } from "../../firebase-config"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import {
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  doc,
} from "firebase/firestore"
import { useNavigate, useOutletContext } from "react-router-dom"
import styles from "./style.module.css"
const Settings = () => {
  const userList = collection(db, "users")
  const { user } = useOutletContext()
  const navigate = useNavigate()
  const photoRef = useRef()
  const handleSubmit = (e) => {
    e.preventDefault()
    const file = photoRef.current.files[0]
    if (!file) {
      return
    }
    const storageRef = ref(storage, `files/${Date.now() + file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on("state_changed", null, null, () => {
      console.log("Uploaded...")
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        const q = query(userList, where("userId", "==", user))
        const info = await getDocs(q)
        if (info.size > 0) {
          let id = info.docs[0].id
          await updateDoc(doc(db, "users", id), { profilePicture: downloadURL })
          navigate("/profile")
        }
      })
    })
  }
  return (
    <div>
      <form className={styles.uploadForm} onSubmit={handleSubmit}>
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
          <button type="submit">Upload!</button>
        </div>
      </form>
    </div>
  )
}
export default Settings
