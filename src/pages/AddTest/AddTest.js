import { useState, useEffect } from "react"
import styles from "./style.module.css"
import { db } from "../../firebase-config"
import { collection, addDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
const AddTest = () => {
  const [test, setTest] = useState({ title: "", questions: [] })
  const [error, setError] = useState("")
  const testList = collection(db, "tests")
  const navigate = useNavigate()
  const handleAdd = async (e) => {
    setError("")
    e.preventDefault()
    await addDoc(testList, test)
    navigate("tests")
  }

  const addQuestion = () => {
    setTest({
      ...test,
      questions: [...test.questions, { id: Date.now(), text: "", answers: [] }],
    })
  }

  const addAnswer = (id) => {
    setTest({
      ...test,
      questions: [
        ...test.questions.map((elm) => {
          if (elm.id !== id) {
            return elm
          }
          return {
            ...elm,
            answers: [
              ...elm.answers,
              { id: Date.now(), text: "", isCorrect: false },
            ],
          }
        }),
      ],
    })
  }
  const updateQuestionText = (e, id) => {
    let question = e.target.value
    if (!question.trim()) {
      setError("Please write a question")
    } else {
      setError("")
      setTest({
        ...test,
        questions: [
          ...test.questions.map((elm) =>
            elm.id !== id ? elm : { ...elm, text: question }
          ),
        ],
      })
    }
  }
  const updateAnswerTest = (e, obj) => {
    obj.text = e.target.value
    setTest({ ...test })
    console.log(obj)
  }
  const rightOrWrong = (e, obj) => {
    let isCorr = e.target.value
    obj.isCorrect = isCorr
  }
  useEffect(() => {
    if (!test.title.trim()) {
      setError("Please fill the title")
    } else if (test.title.match(/^[a-z]+$/)) {
      setError("Please start with Capitalize")
    } else {
      setError("")
    }
  }, [test.title])
  return (
    <div className={styles.testDiv}>
      <h1>Add your test</h1>
      <button onClick={() => addQuestion()}>Add Question</button>
      <form className={styles.testForm} onSubmit={handleAdd}>
        <p>{error}</p>
        <div className={styles.testInputDiv}>
          <input
            className={styles.testInput}
            placeholder="Title of the test"
            required={true}
            type="text"
            value={test.title}
            onChange={(e) => setTest({ ...test, title: e.target.value })}
          />
        </div>
        <div>
          {test.questions.map((elm) => {
            return (
              <div key={elm.id}>
                <textarea
                  value={elm.text}
                  rows="6"
                  cols="20"
                  placeholder="Write question here"
                  required={true}
                  onChange={(e) => updateQuestionText(e, elm.id)}
                  className={styles.textArea}
                />
                <button type="button" onClick={() => addAnswer(elm.id)}>
                  Add Answer
                </button>
                <div>
                  {elm.answers.map((item, i) => {
                    return (
                      <div key={item.id}>
                        <input
                          className={styles.testInput}
                          value={item.text}
                          onChange={(e) => updateAnswerTest(e, item)}
                          placeholder={`Variant ${i + 1}`}
                          type="text"
                          required={true}
                        />
                        <select
                          className={styles.select}
                          onChange={(e) => rightOrWrong(e, item)}
                        >
                          <option value="Select" key={Date.now() + 1}>
                            Select type
                          </option>
                          <option value="true" key={Date.now() + 2}>
                            Right
                          </option>
                          <option value="false" key={Date.now() + 3}>
                            Wrong
                          </option>
                        </select>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}
export default AddTest
