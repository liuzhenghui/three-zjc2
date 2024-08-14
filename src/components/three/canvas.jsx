import React, {useEffect, useRef, useImperativeHandle, useState} from "react";
import {render, unmountComponentAtNode} from "./index";

export function Canvas(props, ref) {
    const {children, frameUpdates = []} = props

    const rendererRef = useRef()
    const sceneRef = useRef()
    const cameraRef = useRef()

    const [t, setT] = useState(0)

    if (!ref) ref = useRef()


    useEffect(() => {
        console.log('useScene init', ref.current?.parentElement)
        if (ref.current) {
            const width = ref.current?.parentElement?.clientWidth || 800
            const height = ref.current?.parentElement?.clientHeight || 800

            console.log('canvas', width, height)

            sceneRef.current = new THREE.Scene()

            rendererRef.current = new THREE.WebGLRenderer({canvas: ref.current, antialias: true});
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
        if (sceneRef.current) render(children, sceneRef.current)

        return () => {
            unmountComponentAtNode(sceneRef.current);
        }
    }, [])

    return (
        <div style={{width: '100%', height: '100%'}}>
            <canvas ref={ref} t={new Date().getTime()}/>
            <div style={{width: '100%'}}>
                <button onClick={() => setT(t + 1)}>t{t}</button>
            </div>
        </div>
    )
}

export default React.forwardRef(Canvas)