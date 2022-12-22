import { useState } from 'react'
export default function ModalAction({ state, action }) {
    const [act, setAction] = useState("")

    const onChange = (event) => {
        const { value } = event.target;
        setAction(value);
    };

    return (
        <div className={`fixed top-0 left-0 bg-black/50 w-full h-full rounded justify-center items-center ${state ? "flex" : "hidden"}`}>
            <div className="relative bg-gray-700 rounded-md p-5 flex flex-col gap-y-5">
                <div className="flex flex-row gap-x-3 items-start">
                    <div className="flex flex-col w-full gap-y-1 items-center justify-between">
                        <p>Action</p>
                        <input type='text' placeholder="Set custom action" className="w-42 text-black text-xl p-1 rounded" value={act} onChange={(event) => onChange(event)} required></input>
                    </div>
                </div>
                <button onClick={()=> action(act)} className="bg-gray-600 px-5 py-2 rounded hover:bg-rose-600">Cofirm</button>
            </div>
        </div>
    )
}