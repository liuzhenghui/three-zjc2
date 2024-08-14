import {useEffect, useRef} from "react";

function useFrameFactory() {
    const frameUpdatesRef = useRef([])

    const useFrame = (cb) => {
        useEffect(() => {
            if (typeof cb === 'function') {
                frameUpdatesRef.current.push(cb)
            }
            return () => {
                frameUpdatesRef.current = frameUpdatesRef.current.filter((f) => f !== cb);
            }
        }, [])
    }

    return [
        frameUpdatesRef.current,
        useFrame,
    ]
}

export default useFrameFactory