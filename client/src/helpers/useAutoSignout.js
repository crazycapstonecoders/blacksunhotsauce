import { useState, useEffect } from 'react'

// custom react hook to handle the timer
const useAutoSignout = startTime => {
    const [timer, setTimer] = useState(startTime)


    useEffect(() => {
      const myInterval = setInterval(() => {
        if (timer > 0) {
          setTimer(timer - 1)
        }
      }, 1000)

      const resetTimeout = () => {
        setTimer(startTime)
      }

      // list of events that we want to listen on
      const events = [
        "load",
        "click"
      ]
      // loop and add the listener
      for (let i in events) {
        window.addEventListener(events[i], resetTimeout)
      }

      // whenever the above events happen
      return () => {
        // clear the interval
        clearInterval(myInterval)
        // remove all listeners and reset the timer
        for (let i in events) {
          window.removeEventListener(events[i], resetTimeout)
        }
      }
    })
    return timer
  }

  export default useAutoSignout