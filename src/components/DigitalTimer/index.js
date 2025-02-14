// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    isTimerRunning: false,
    timeElapsedInSeconds: 0,
    timerLimitInMinutes: 25,
    toIncreaseTime: true,
  }

  onStartOrPauseTimer = () => {
    const {
      isTimerRunning,
      timeElapsedInSeconds,
      timerLimitInMinutes,
    } = this.state

    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }

    if (isTimerRunning) {
      clearInterval(this.intervalId)
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))

    const stringifiedMinutes =
      timerLimitInMinutes > 9 ? timerLimitInMinutes : `0${timerLimitInMinutes}`
    const stringifiedSeconds =
      timeElapsedInSeconds > 9
        ? timeElapsedInSeconds
        : `0${timeElapsedInSeconds}`
  }

  incrementTimeElapsedInSeconds = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
    }))
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const stringifiedMinutes =
      timerLimitInMinutes > 9 ? timerLimitInMinutes : `0${timerLimitInMinutes}`
    const stringifiedSeconds =
      timeElapsedInSeconds > 9
        ? timeElapsedInSeconds
        : `0${timeElapsedInSeconds}`
  }

  onResetTimer = () => {
    clearInterval(this.intervalId)
    this.setState({
      timerLimitInMinutes: 25,
    })
  }

  onDecreaseTime = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      toIncreaseTime: !prevState.toIncreaseTime,
    }))
  }

  onIncreaseTime = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
      toIncreaseTime: !prevState.toIncreaseTime,
    }))
  }

  render() {
    const {isTimerRunning, timerLimitInMinutes, toIncreaseTime} = this.state

    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'
    return (
      <div className="bg-container">
        <h1 className="timer-main-heading">Digital Timer</h1>
        <div className="watch-timer-container">
          <div className="watch-timer-img">
            <p className="timer-container">{timerLimitInMinutes}</p>
          </div>

          <div className="buttons-container">
            <button type="button" onClick={this.onStartOrPauseTimer}>
              <img src={startOrPauseImageUrl} alt={startOrPauseAltText} />
              <p>{isTimerRunning ? 'Pause' : 'Start'}</p>
            </button>

            <button type="button" onClick={this.onResetTimer}>
              <img
                src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                alt="reset icon"
              />
              <p>Reset</p>
            </button>
          </div>
          <div>
            <button onClick={this.onDecreaseTime}>-</button>
            {toIncreaseTime ? (
              <p>{timerLimitInMinutes} + 1</p>
            ) : (
              <p>{timerLimitInMinutes} - 1</p>
            )}
            <button onClick={this.onIncreaseTime}>+</button>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
