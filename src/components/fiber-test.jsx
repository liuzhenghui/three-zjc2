import {Canvas} from '@react-three/fiber'
import {OrbitControls} from '@react-three/drei'
// import OrbitControls from "./three/addons/OrbitControls";

function FiberTest() {


    return (
        <div style={{width: 600, height: 600}}>
            <Canvas>
                <mesh position={[-0.5, 0, 0]}>
                    <boxBufferGeometry/>
                    <meshStandardMaterial color={'blue'}/>
                </mesh>
                <OrbitControls/>
            </Canvas>
        </div>
    )
}

export default FiberTest