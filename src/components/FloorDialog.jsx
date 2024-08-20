import React, {useMemo, useEffect, useState} from 'react';
import CameraControls from "./three/CameraControls";
import Animation from "./three/Animation";
import FloorPlan from "./FloorPlan";

function FloorDialog(props) {
    const {Fiber} = window.ThreeLibs

    const {open = false, floor, onClose} = props
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose?.();
            }
        }
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        };
    }, []);

    if (!open) return <></>

    return (
        <div className={`FloorDialog ${open ? 'open' : ''}`}>
            <div className="header">
                <div className="title">第 {floor?.index} 层</div>
            </div>
            <Fiber.Canvas key={floor?.index} camera={{position: [-40, 8, -40]}}>
                <pointLight intensity={0.6} position={[2000, 2000, 2000]}/>
                <pointLight intensity={0.6} position={[-2000, 2000, -2000]}/>
                <pointLight intensity={0.6} position={[-2000, 2000, 2000]}/>
                <pointLight intensity={0.6} position={[2000, 2000, -2000]}/>
                <pointLight position={[0, -100, 0]}/>
                <FloorPlan onLoad={() => setLoading(false)} file="floor.glb" position={[0, -10, 0]}/>
                <CameraControls/>
                {loading ? null : <Animation to={[5, 22, 22]} time={800}/>}
            </Fiber.Canvas>
        </div>
    )
}

export default FloorDialog