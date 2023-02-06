import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"
import { db } from "../../firebase-config"
import styles from "./style.module.css"
const Tests = () => {
  const navigate = useNavigate()
  const [test, setTest] = useState([])
  const testList = collection(db, "tests")
  const getTests = async () => {
    const tests = await getDocs(testList)
    setTest(
      tests.docs.map((elm) => ({
        ...elm.data(),
        id: elm.id,
      }))
    )
  }
  const testDetails = (test) => {
    navigate("/profile/test/" + test.id)
  }
  const handleDelete = async (id) => {
    let item = await doc(db, "tests", id)
    setTest(test.filter((elm) => elm.id !== id))
    await deleteDoc(item)
  }
  useEffect(() => {
    getTests()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      <h1>Tests</h1>
      {!test ? (
        <p style={{ color: "black" }}>Loading please wait...</p>
      ) : (
        <div className={styles.testDivs}>
          {test.map((elm, i) => {
            return (
              <div className={styles.testDiv} key={i}>
                <h1 onClick={() => testDetails(elm)}>{elm.title}</h1>
                <button onClick={() => handleDelete(elm.id)}>Delete</button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
export default Tests
