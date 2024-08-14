import React, {useRef} from 'react';
import {Canvas, useFrame} from "./three";
import OrbitControls from "./three/addons/OrbitControls";

function ThreeTest(props) {
    const boxRef = useRef();
    const boxRef2 = useRef();

    useFrame(() => {
        boxRef.current.rotation.x += 0.01;
        boxRef2.current.rotation.x += 0.02;
    });

    return (
        <div style={{width: '100%', height: '100%'}}>
            <div style={{display: 'inline-block', width: '48%'}}>
                <Canvas>
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
                            // materialColor={new THREE.Color(0xff0000)}
                            rotationX={2}
                        />
                    </group>
                    <OrbitControls/>
                </Canvas>
            </div>
            <div style={{display: 'inline-block', width: '48%'}}>
                <Canvas>
                    <group>
                        <mesh
                            ref={boxRef2}
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
        </div>
    )
}

export default ThreeTest