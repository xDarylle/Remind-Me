// this returns current time in seconds
export const getCurrentTime = () => {
    const time = new Date()
    return Math.round(time.getTime()/1000)
}

export const getFutureTime = (value, format) => {
    const currentTime = getCurrentTime()

    if (format === "minute") {
        return (value * 60) + currentTime
    }

    if (format === "hour") {
        return (value * 60 * 60) + currentTime
    }
}