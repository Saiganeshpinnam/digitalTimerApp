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
    this.setState(prevState => {
      const {timerLimitInMinutes, timeElapsedInSeconds} = prevState
      const totalRunningTime = timerLimitInMinutes * 60 - timeElapsedInSeconds

      if (totalRunningTime > 0) {
        return {timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1}
      }
      clearInterval(this.intervalId)
      return {isTimerRunning: false}
    })
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

  getFormattedTime = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingTime = timerLimitInMinutes * 60 - timeElapsedInSeconds

    const minutes = Math.floor(totalRemainingTime / 60)
    const seconds = totalRemainingTime % 60

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
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
            <p className="timer-container">{this.getFormattedTime()}</p>
          </div>

          <div className="start-reset-btns-container">
            <button
              type="button"
              onClick={this.onStartOrPauseTimer}
              className="btn-container"
            >
              <img
                src={startOrPauseImageUrl}
                alt={startOrPauseAltText}
                className="start-pause-reset-btn-icons"
              />
              <p className="pause-start-text">
                {isTimerRunning ? 'Pause' : 'Start'}
              </p>
            </button>

            <button
              type="button"
              onClick={this.onResetTimer}
              className="btn-container"
            >
              <img
                src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                className="start-pause-reset-btn-icons"
                alt="reset icon"
              />
              <p>Reset</p>
            </button>
          </div>
          <p className="set-timer-text">Set Timer Limit</p>
          <div className="increase-decrease-timer-container">
            <button
              onClick={this.onDecreaseTime}
              className="increase-decrease-btns"
            >
              -
            </button>
            {toIncreaseTime ? (
              <p className="custom-time">{timerLimitInMinutes} </p>
            ) : (
              <p className="custom-time">{timerLimitInMinutes} </p>
            )}
            <button
              onClick={this.onIncreaseTime}
              className="increase-decrease-btns"
            >
              +
            </button>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
