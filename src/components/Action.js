
export default function Action({ action, onChange, checked}) {

    return (
        <div className="w-full">
            <input
                id={action}
                type='radio'
                value={action}
                className="hidden peer"
                onChange={() => {onChange(action)}}
                name="action"
                checked={checked}
            />
            <label htmlFor={action} className="cursor-pointer w-32 h-48 bg-gray-700 flex flex-col justify-center items-center rounded-md peer-checked:bg-rose-600 peer-checked:text-white">
                <p className='text-base'>{action}</p>
            </label>
        </div>
    )
}