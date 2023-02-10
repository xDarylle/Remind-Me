
export default function Repeat({ repeat, onChange, checked }) {
    return (
        <div className="w-full">
            <input
                id={repeat}
                type='radio'
                value={repeat}
                className="hidden peer"
                onChange={()=> {onChange(repeat)}}
                name="repeat"
                checked={checked}
            />
            <label htmlFor={repeat} className="cursor-pointer w-full p-2 md:py-5 lg:py-2 bg-gray-700 flex flex-col justify-center items-center rounded-md peer-checked:bg-rose-600 peer-checked:text-white">
                <p className='text-lg'>{repeat}</p>
            </label>
        </div>

    )
}