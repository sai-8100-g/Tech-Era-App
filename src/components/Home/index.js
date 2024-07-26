import {Component} from 'react'
import ProgressView from '../ProgressView'
import CoursesList from '../CoursesList'
import Navbar from '../Navbar'
import FailureView from '../FailureView'
import './index.css'

const status = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}
class Home extends Component {
  state = {
    renderStatus: 'INITIAL',
    courses: [],
  }

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({renderStatus: status.progress})
    const response = await fetch(' https://apis.ccbp.in/te/courses')
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.courses.map(eachObj => ({
        id: eachObj.id,
        name: eachObj.name,
        logoUrl: eachObj.logo_url,
      }))
      this.setState({courses: updatedData, renderStatus: status.success})
    } else {
      this.setState({renderStatus: status.failure})
    }
  }

  renderProgress = () => <ProgressView />

  retryFetch = () => {
    this.getCourseDetails()
  }

  renderFailure = () => <FailureView retryFetch={this.retryFetch} />

  renderSuccess = () => {
    const {courses} = this.state
    return (
      <>
        <h1>Courses</h1>
        <ul className="coursesUl">
          {courses.map(eachObj => (
            <CoursesList data={eachObj} key={eachObj.id} />
          ))}
        </ul>
      </>
    )
  }

  renderRenderStatus = () => {
    const {renderStatus} = this.state
    switch (renderStatus) {
      case status.success:
        return this.renderSuccess()
      case status.failure:
        return this.renderFailure()
      case status.progress:
        return this.renderProgress()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-container">
        <Navbar />
        <div
          style={{
            padding: '0% 4%',
          }}
        >
          {this.renderRenderStatus()}
        </div>
      </div>
    )
  }
}

export default Home
