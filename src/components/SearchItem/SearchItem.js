import { Link, useNavigate } from "react-router-dom"
import styles from "./style.module.css"
const SearchItem = ({ person }) => {
  const navigate = useNavigate()
  const defPicture = "https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
  const goToAcc = () => {
    navigate("/profile/user/account/" + person.id)
  }
  return (
    <div className={styles.searchResult}>
      <img
        src={person.profilePicture ? person.profilePicture : defPicture}
        onClick={goToAcc}
        alt=""
      />
      <h3>
        {person.first} {person.last}
      </h3>
      <Link
        className={styles.seeProfile}
        to={"/profile/user/account/" + person.id}
      >
        See Profile
      </Link>
    </div>
  )
}
export default SearchItem
