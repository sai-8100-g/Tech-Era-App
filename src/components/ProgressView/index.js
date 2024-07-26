import Loader from 'react-loader-spinner'
import './index.css'

const ProgressView = () => (
  <div className="loader" data-testid="loader">
    <Loader type="ThreeDots" color="#1e293b" height={50} width={50} />
  </div>
)

export default ProgressView
