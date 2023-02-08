import ModalAction from './ModalAction'
import Action from './Action'
import { useState } from 'react'

export default function CustomAction({ setAction, checked }) {
    const [click, setClick] = useState(false)

    const action = (act) => {
        setAction(act)
        setClick(false)
    }

    return (
        <div className="">
            <ModalAction state={click} action={action}/>
            <button onClick={() => setClick(true)}>
                <Action action={"Set Custom"} onChange={()=>{}} checked={checked}/>
            </button>
        </div>
    )
}