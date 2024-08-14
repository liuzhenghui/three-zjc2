import React, {useEffect, useRef, useState, useCallback, useMemo} from "react";
import Canvas from "../canvas";
import useFrameFactory from "./useFrameFactory";

function useThree() {


    const [frameUpdates, useFrame] = useFrameFactory()

    const CanvasWrapper = useMemo(() => {
        return React.forwardRef((props, ref) => {
            return <Canvas {...props} ref={ref} frameUpdates={frameUpdates}/>
        })
    }, [])

    return {
        Canvas: CanvasWrapper,
        useFrame,
    }
}


export default useThree