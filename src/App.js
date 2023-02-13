import Time from './components/Time'
import Repeat from './components/Repeat'
import Action from './components/Action'
import CustomTime from './components/CustomTime'
import CustomAction from './components/CustomAction'

import { useState, useEffect } from 'react'
import { getCurrentTime, getFutureTime } from './hooks/time'

import addNotification from 'react-push-notification';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialTime = {
  time: "",
  format: ""
}

const initialActionChecked = {
  drink: false,
  break: false,
  custom: false
}

const initialTimeChecked = {
  min_20: false,
  min_10: false,
  hr_1: false,
  custom: false
}

const initiaRepeatChecked = {
  once: false,
  repeat: false,
}

function App() {
  const [{ time, format }, setTime] = useState(initialTime)
  const [repeat, setRepeat] = useState("")
  const [action, setAction] = useState("")
  const [futureTime, setFutureTime] = useState(0)

  const [actionChecked, setActionChecked] = useState(initialActionChecked)
  const [repeatChecked, setRepeatChecked] = useState(initiaRepeatChecked)
  const [timeChecked, setTimeChecked] = useState(initialTimeChecked)

  // request notification permission first
  Notification.requestPermission()

  const setChecked = (setState, name) => {
    setState((prevState) => ({ ...prevState, [name]: true }))
  }

  const handleRepeat = (repeat) => {
    let name

    switch (repeat) {
      case "Once":
        name = "once"
        break
      case "Repeat":
        name = "repeat"
        break
      default:
        name = "once"
    }

    setRepeatChecked(initiaRepeatChecked)
    setChecked(setRepeatChecked, name)
    setRepeat(repeat)
  }

  const handleAction = (action) => {
    let name

    switch (action) {
      case "Drink water":
        name = "drink"
        break
      case "Take a break":
        name = "break"
        break
      default:
        name = "custom"
    }

    setActionChecked(initialActionChecked)
    setChecked(setActionChecked, name)
    setAction(action)
  }

  const handleTime = (time, format) => {
    let name

    switch (time) {
      case "10":
        name = "min_10"
        break
      case "20":
        name = "min_20"
        break
      case "1":
        if (format === "hour")
          name = "hr_1"
        else
          name = "custom"
        break
      default:
        name = "custom"
    }

    setTimeChecked(initialTimeChecked)
    setChecked(setTimeChecked, name)
    setTime({ time: time, format: format })
  }

  const reset = () => {
    setTime(initialTime)
    setRepeat("")
    setAction("")
    setFutureTime(0)

    setTimeChecked(initialTimeChecked)
    setActionChecked(initialActionChecked)
    setRepeatChecked(initiaRepeatChecked)
  }

  const pushNotification = () => {
    addNotification({
      title: action,
      native: true, // when using native, your OS will handle theming.
      icon: "/favicon.ico", 
      vibrate: 1, 
      silent: false
    })
  }

  const pushToast = () => {
    toast(action, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }

  useEffect(() => {
    document.title = 'Remind Me';
  }, []);

  useEffect(() => {
      const interval = setInterval(() => {
        if (getCurrentTime() === futureTime) {
          pushNotification()
          pushToast()

          if (repeat === "Repeat") {
            setFutureTime(getFutureTime(time, format))
          }
        }
      }, 1000)

      return () => clearInterval(interval)
    }, [futureTime, time, format, repeat, action])

  useEffect(() => {
      if (time && format && repeat && action) {
        setFutureTime(getFutureTime(time, format))
      }
  }, [time, format, repeat, action])

  return (
      <div className="w-full min-h-screen bg-slate-900 flex justify-center align-center">
        <div className="flex flex-col gap-y-3 text-white md:w-5/6 lg:w-2/5 w-full p-5  flex justify-center align-center">
          <div className="flex flex-col gap-y-2">
            <ToastContainer />
            <div className="flex flex-row justify-between">
              <p className="font-medium text-3xl">Remind me to</p>
              <button onClick={reset}>Reset</button>
            </div>
            <div className={`w-full rounded-md ${action && time && repeat ? "bg-rose-600" : "bg-gray-700"} text-white px-5 py-10 text-center font-bold text-2xl`}>
              {action && time && repeat ?
                action + (repeat === 'Once' ? ' in ' : ' every ') + time + " " + (parseInt(time) > 1 ? format + "s" : format)
                : "Set time and action"
              }
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <p className="">Set Time</p>
            <div className="flex flex-row gap-x-2">
              <Time time="10" format={'minute'} onChange={handleTime} checked={timeChecked.min_10} />
              <Time time="20" format={'minute'} onChange={handleTime} checked={timeChecked.min_20} />
              <Time time="1" format={'hour'} onChange={handleTime} checked={timeChecked.hr_1} />
              <CustomTime setTime={handleTime} checked={timeChecked.custom} />
            </div>
            <p className="">Set Repeat</p>
            <div className="flex flex-row gap-x-2">
              <Repeat repeat={'Once'} onChange={handleRepeat} checked={repeatChecked.once} />
              <Repeat repeat={'Repeat'} onChange={handleRepeat} checked={repeatChecked.repeat} />
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <p className="">Set Action</p>
            <div className="flex flex-row gap-2">
              <Action action="Drink water" onChange={handleAction} checked={actionChecked.drink} />
              <Action action="Take a break" onChange={handleAction} checked={actionChecked.break} />
              <CustomAction setAction={handleAction} checked={actionChecked.custom} />
            </div>
          </div>

        </div>
      </div>
    )
  }

  export default App;
