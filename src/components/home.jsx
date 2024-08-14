import ThreeTest from "./three-test";
import useThree from "./three/hooks/useThree";
import {useRef, useState} from "react";
import {Canvas} from "./three";
import TT from "./tt";

function Home(props) {

    const [t, setT] = useState(0)
    const boxRef = useRef();

    const {Canvas, useFrame} = useThree()
    // const {Canvas: Canvas2, useFrame: useFrame2} = useThree()

    const r = useRef()

    useFrame(() => {
        // console.log('aaa')
        boxRef.current.rotation.x += 0.01
    })

    return (
        <div className="home">
            <div style={{width: '100%'}}>
                <Canvas>
                    <ambientLight/>
                    <group>
                        <mesh
                            ref={boxRef}
                            geometry={new THREE.BoxGeometry(5, 5, 1)}
                            material={
                                new THREE.MeshBasicMaterial({
                                    color: 0x00ff00,
                                    transparent: true
                                })
                            }
                            materialColor={new THREE.Color(0xff0000)}
                            rotationX={2}
                        />
                    </group>
                </Canvas>
            </div>
            <div>
                <TT/>
            </div>
            <div>
                <button onClick={() => {
                    setT(t + 1)
                }}>home{t}</button>
            </div>
        </div>
    )
}

export default Home