// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {date: new Date()}
  }

  componentDidMount() {
    this.timerId = setInterval(this.tick, 1000)
  }

  tick = () => {
    this.setState({
      date: new Date(),
    })
  }

  render() {
    const {date} = this.state
    return (
      <div className="bg-container">
        <h1 className="timer-main-heading">Digital Timer</h1>
        <div className="watch-timer-img">
          <div className=" timer-container">
            <p>{date.toLocaleTimeString()}</p>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
