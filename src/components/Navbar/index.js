import {Link} from 'react-router-dom'

import './index.css'

const Navbar = () => (
  <nav>
    <Link className="navLink" to="/">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
      />
    </Link>
  </nav>
)

export default Navbar
