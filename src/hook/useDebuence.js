import { useState, useEffect } from 'react'

function useDebounce( value,  delay) {
    const [deounceValue,setDeounceValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout( () => setDeounceValue(value), 500)
        return () => clearTimeout(handler)
    }, [value])

    return deounceValue ;
}

export default useDebounce