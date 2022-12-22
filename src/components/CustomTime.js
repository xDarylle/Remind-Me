import Modal from './Modal'
import Time from './Time'
import { useState } from 'react'

export default function CustomTime({ setTime }) {
    const [click, setClick] = useState(false)

    const action = (time, format) => {
        setTime(time, format)
        setClick(false)
    }

    return (
        <div className="">
            <Modal state={click} type='time' action={action}/>
            <button onClick={() => setClick(true)}>
                <Time time="Set" format="Custom" onChange={()=>{}}/>
            </button>
        </div>
    )
}