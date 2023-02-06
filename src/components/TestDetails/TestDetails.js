import { doc, getDoc } from "firebase/firestore"
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { db } from "../../firebase-config"
import styles from "./style.module.css"
const TestDetails = () => {
  const [test, setTest] = useState(null)
  const navigate = useNavigate()
  const { id } = useParams()
  const getTest = async () => {
    const test = await doc(db, "tests", id)
    const obj = await getDoc(test)
    if (!obj._document) {
      return navigate("/profile/tests/")
    } else {
      setTest(obj.data())
    }
  }
  const handleAnswer = (answer) => {
    if (answer.isCorrect === "true") {
      alert("Your answer is right")
      console.log("Your answer is right")
      //  Add effect for right answer
    }
    if (answer.isCorrect === "false") {
      alert("Your answer is wrong")
      console.log("Your answer is wrong")
      //  Add effect for wrong answer
    }
  }
  useEffect(() => {
    getTest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {!test ? (
        <p style={{ color: "black" }}>Loading please wait...</p>
      ) : (
        <div className={styles.testDiv}>
          <h3>{test.title}</h3>
          {test.questions.map((elm, i) => {
            return (
              <div className={styles.test} key={i}>
                <p style={{ color: "black", textAlign: "center" }}>Question</p>
                <h2>{elm.text}</h2>
                <p style={{ color: "black", textAlign: "center" }}>Answers</p>
                {elm.answers.map((el, i) => {
                  return (
                    <div className={styles.answers} key={i}>
                      <h3 onClick={() => handleAnswer(el)}>{el.text}</h3>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
export default TestDetails
