
export default function Time({ time, format, onChange }) {
    return (
        <div className="w-full">
            <input
                id={time}
                type='radio'
                value={time}
                format={format}
                className="hidden peer"
                onChange={() => {onChange(time, format)}}
                name="time"
            />
            <label htmlFor={time} className="cursor-pointer w-24 h-32 bg-gray-700 flex flex-col justify-center items-center rounded-md peer-checked:bg-rose-600 peer-checked:text-white">
                <p className='text-2xl font-medium'>{time}</p>
                <p>{format}</p>
            </label>
        </div>

    )
}