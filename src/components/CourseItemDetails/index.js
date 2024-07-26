import {Component} from 'react'
import ProgressView from '../ProgressView'
import Navbar from '../Navbar'
import FailureView from '../FailureView'
import './index.css'

const status = {
  success: 'PROGRESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class CourseDetails extends Component {
  state = {
    renderStatus: 'INITIAL',
    courseData: '',
  }

  componentDidMount() {
    this.getSelectedCourseData()
  }

  getSelectedCourseData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({renderStatus: status.progress})
    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    const data = await response.json()
    if (response.ok) {
      const courseDetails = data.course_details
      const updatedData = {
        id: courseDetails.id,
        name: courseDetails.name,
        imageUrl: courseDetails.image_url,
        description: courseDetails.description,
      }

      this.setState({courseData: updatedData, renderStatus: status.success})
    } else {
      this.setState({renderStatus: status.failure})
    }
  }

  retryFetch = () => {
    this.getSelectedCourseData()
  }

  renderFailure = () => <FailureView retryFetch={this.retryFetch} />

  renderProgress = () => <ProgressView />

  renderSuccess = () => {
    const {courseData} = this.state
    const {description, name, imageUrl} = courseData
    return (
      <div className="item-container">
        <img src={imageUrl} alt={name} />
        <div
          style={{
            padding: '1% 4%',
          }}
        >
          <h1 className="item-name">{name}</h1>
          <p className="item-description">{description}</p>
        </div>
      </div>
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
      <div className="course-container">
        <Navbar />
        <div
          style={{
            height: '90vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {this.renderRenderStatus()}
        </div>
      </div>
    )
  }
}

export default CourseDetails
