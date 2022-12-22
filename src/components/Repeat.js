
export default function Repeat({ repeat, onChange }) {
    return (
        <div className="w-full">
            <input
                id={repeat}
                type='radio'
                value={repeat}
                className="hidden peer"
                onChange={()=> {onChange(repeat)}}
                name="repeat"
            />
            <label htmlFor={repeat} className="cursor-pointer w-full p-2 bg-gray-700 flex flex-col justify-center items-center rounded-md peer-checked:bg-rose-600 peer-checked:text-white">
                <p className='text-xl'>{repeat}</p>
            </label>
        </div>

    )
}