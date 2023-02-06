import { useState } from "react"
import styles from "./style.module.css"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "./../../firebase-config"
import SearchItem from "../SearchItem/SearchItem"
const SearchUsers = () => {
  const [text, setText] = useState("")
  const [result, setResult] = useState([])
  const userList = collection(db, "users")
  const handleSearch = async (e) => {
    e.preventDefault()
    let current = e.target.value
    setText(current)
    const items = await getDocs(query(userList, where("first", "==", current)))
    setResult(
      items.docs.map((elm) => {
        return {
          ...elm.data(),
          id: elm.id,
        }
      })
    )
  }
  return (
    <div>
      <input
        className={styles.searchText}
        type="text"
        placeholder="Search for friends..."
        value={text}
        onChange={handleSearch}
        required={true}
      />
      <div className={styles.grid}>
        {result.map((elm) => (
          <SearchItem key={elm.id} person={elm} />
        ))}
      </div>
    </div>
  )
}
export default SearchUsers
