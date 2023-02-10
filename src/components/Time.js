
export default function Time({ time, format, onChange, checked }) {
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
                checked={checked}
            />
            <label htmlFor={time} className="cursor-pointer h-32 md:h-72 lg:h-48 bg-gray-700 flex flex-col justify-center items-center rounded-md peer-checked:bg-rose-600 peer-checked:text-white">
                <p className='text-2xl font-medium'>{time}</p>
                <p className='text-white/80'>{format}</p>
            </label>
        </div>

    )
}