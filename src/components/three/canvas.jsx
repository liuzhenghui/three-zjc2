import React, {useEffect, useRef, useImperativeHandle, useState, useLayoutEffect} from "react";
import render from "./render";
import {ThreeContext} from "./contexts";

function Block({set}) {
    useLayoutEffect(() => {
        set(new Promise(() => null))
        return () => set(false)
    }, [])
    return null
}

function Canvas(props, forwardedRef) {
    const {children, frameUpdates = []} = props

    const canvasRef = useRef()

    const rendererRef = useRef()
    const sceneRef = useRef()
    const cameraRef = useRef()

    const [block, setBlock] = React.useState(false)
    const [t, setT] = useState(0)

    useImperativeHandle(forwardedRef, () => canvasRef.current)


    useEffect(() => {
        console.log('useScene init', canvasRef.current?.parentElement)
        if (canvasRef.current) {
            const width = canvasRef.current?.parentElement?.clientWidth || 800
            const height = canvasRef.current?.parentElement?.clientHeight || 800

            console.log('canvas', width, height)

            sceneRef.current = new THREE.Scene()

            rendererRef.current = new THREE.WebGLRenderer({canvas: canvasRef.current, antialias: true});
            rendererRef.current.setSize(width, height);
            rendererRef.current.setClearColor(0x4682B4, 0.6);
            rendererRef.current.setClearAlpha(0.6)
            rendererRef.current.shadowMap.enabled = true;
            rendererRef.current.shadowMap.type = THREE.PCFSoftShadowMap;

            cameraRef.current = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
            cameraRef.current.position.set(10, 10, 10);
            cameraRef.current.lookAt(sceneRef.current.position);
            sceneRef.current.add(cameraRef.current);

            // 渲染
            let requestAnimationFrameId
            const animate = () => {
                frameUpdates.forEach(u => {
                    u && u();
                })
                requestAnimationFrameId = requestAnimationFrame(animate)
                // console.log('animate', rendererRef.current, sceneRef.current, cameraRef.current)
                if (rendererRef.current && sceneRef.current && cameraRef.current) {
                    rendererRef.current.render(sceneRef.current, cameraRef.current)
                }
            }
            animate()

            return () => requestAnimationFrameId && cancelAnimationFrame(requestAnimationFrameId)
        }


    }, [])

    useEffect(() => {
        console.log('Canvas useEffect')
        if (sceneRef.current) {
            render(
                children,
                sceneRef.current,
            )
        }

        return () => {
            // unmountComponentAtNode(sceneRef.current);
        }
    }, [children])

    useLayoutEffect(() => {
    }, [])

    return (
        <ThreeContext.Provider
            value={{renderer: rendererRef.current, scene: sceneRef.current, camera: cameraRef.current}}>
            <div style={{width: '100%', height: '100%'}}>
                <canvas ref={canvasRef} t={new Date().getTime()}/>
                <div style={{width: '100%'}}>
                    <button onClick={() => setT(t + 1)}>t{t}</button>
                </div>
            </div>
        </ThreeContext.Provider>
    )
}

export default React.forwardRef(Canvas)