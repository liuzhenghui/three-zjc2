import OrbitControls from "./three/addons/OrbitControls";
import useThree from "./three/hooks/useThree";
import {useRef} from "react";
import Canvas1 from "./three/canvas";

function MyThree() {
    // const boxRef = useRef();
    //
    // const {Canvas, useFrame} = useThree()
    //
    // useFrame(() => {
    //     // console.log('aaa')
    //     if (boxRef.current) boxRef.current.rotation.x += 0.01
    // })


    return (
        <>
            <div>
                {/*<Canvas>*/}
                {/*    <ambientLight/>*/}
                {/*    <group>*/}
                {/*        <mesh*/}
                {/*            ref={boxRef}*/}
                {/*            geometry={new THREE.BoxGeometry(5, 5, 1)}*/}
                {/*            material={*/}
                {/*                new THREE.MeshBasicMaterial({*/}
                {/*                    color: 0x00ff00,*/}
                {/*                    transparent: true*/}
                {/*                })*/}
                {/*            }*/}
                {/*            materialColor={new THREE.Color(0x00ff00)}*/}
                {/*            rotationX={2}*/}
                {/*        />*/}
                {/*    </group>*/}
                {/*</Canvas>*/}
            </div>
            <div>
                <Canvas1>
                    <ambientLight/>
                    <group>
                        <mesh
                            geometry={new THREE.BoxGeometry(5, 5, 1)}
                            material={
                                new THREE.MeshBasicMaterial({
                                    color: 0x00ff00,
                                    transparent: true
                                })
                            }
                            materialColor={new THREE.Color(0x00ff00)}
                            rotationX={2}
                        />
                    </group>
                    <OrbitControls/>
                </Canvas1>
            </div>
        </>
    )
}

export default MyThree