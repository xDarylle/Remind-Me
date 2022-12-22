import { useState } from 'react'
export default function Modal({ state, action }) {
    const [{ time, format }, setData] = useState({ time: "", format: "minute" })

    const onChange = (event) => {
        const { name, value } = event.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
    };

    return (
        <div className={`fixed top-0 left-0 bg-black/50 w-full h-full rounded justify-center items-center ${state ? "flex" : "hidden"}`}>
            <div className="relative bg-gray-700 rounded-md p-5 flex flex-col gap-y-5">
                <div className="flex flex-row gap-x-3 items-start">
                    <div className="flex flex-col w-full gap-y-1 items-center justify-between">
                        <p>Time</p>
                        <input type='text' className="w-32 text-black text-xl p-1 rounded" value={time} name='time' onChange={(event) => onChange(event)} required></input>
                    </div>
                    <div className="flex flex-col w-full gap-y-1 items-center justify-between">
                        <p>Format</p>
                        <select className="w-32 text-black p-1 rounded text-xl" name='format' onChange={(event) => onChange(event)} required>
                            <option value="minute">Minute</option>
                            <option value="hour">Hour</option>
                        </select>
                    </div>
                </div>
                <button onClick={()=> action(time ,format)} className="bg-gray-600 px-5 py-2 rounded hover:bg-rose-600">Cofirm</button>
            </div>
        </div>
    )
}