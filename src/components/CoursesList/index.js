import {Link} from 'react-router-dom'
import './index.css'

const CoursesList = props => {
  const {data} = props
  const {name, logoUrl, id} = data

  return (
    <li>
      <Link className="LiLink" to={`courses/${id}`}>
        <img src={logoUrl} alt={name} />
        <p>{name}</p>
      </Link>
    </li>
  )
}

export default CoursesList
