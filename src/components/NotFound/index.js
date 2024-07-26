import Navbar from '../Navbar'

import './index.css'

const NotFound = () => (
  <div className="not-found-main-container">
    <Navbar />
    <div className="not-found-inner-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
      />
      <h1>Page Not Found</h1>
      <p>We are sorry, the page you requested could not be found</p>
    </div>
  </div>
)

export default NotFound
