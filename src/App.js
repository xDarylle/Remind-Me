import Time from './components/Time'
import Repeat from './components/Repeat'
import Action from './components/Action'
import CustomTime from './components/CustomTime'
import CustomAction from './components/CustomAction'

import { useState, useEffect } from 'react'
import { getCurrentTime, getFutureTime } from './hooks/time'

const initialTime = {
  time: "",
  format: ""
}

function App() {
  const [{ time, format }, setTime] = useState(initialTime)
  const [repeat, setRepeat] = useState("")
  const [action, setAction] = useState("")
  const [futureTime, setFutureTime] = useState(0)

  const handleRepeat = (repeat) => {
    setRepeat(repeat)
  }

  const handleAction = (action) => {
    setAction(action)
  }

  const handleTime = (time, format) => {
    setTime({ time: time, format: format })
  }

  const reset = () => {
    setTime(initialTime)
    setRepeat("")
    setAction("")
    setFutureTime(0)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (getCurrentTime() === futureTime) {
        console.log(getCurrentTime(), futureTime)
        console.log(action)

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
    <div className="w-full min-h-screen flex justify-center items-center bg-slate-900">
      <div className="flex flex-col gap-y-3 text-white p-5">
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-row justify-between">
            <p className="font-medium text-2xl">Remind me to</p>
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
            <Time time="10" format={'minute'} onChange={handleTime} />
            <Time time="20" format={'minute'} onChange={handleTime} />
            <Time time="1" format={'hour'} onChange={handleTime} />
            <CustomTime setTime={handleTime} />
          </div>
          <p className="">Set Repeat</p>
          <div className="flex flex-row gap-x-2">
            <Repeat repeat={'Once'} onChange={handleRepeat} />
            <Repeat repeat={'Repeat'} onChange={handleRepeat} />
          </div>
        </div>

        <div className="flex flex-col gap-y-2">
          <p className="">Set Action</p>
          <div className="flex flex-row gap-2">
            <Action action="Drink water" onChange={handleAction} />
            <Action action="Take a break" onChange={handleAction} />
            <CustomAction setAction={setAction} />
          </div>
        </div>

      </div>
    </div>
  )
}

export default App;
