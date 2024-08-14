import React, {useContext, useMemo, useState, useEffect} from 'react'
import {ThreeContext} from "../contexts";

function OrbitControls(props, ref) {

    console.log('OrbitControls')

    // const {renderer, scene, camera} = useContext(ThreeContext)
    //
    // const controls = useMemo(() => {
    //     const orbit = new ThreeAddons.OrbitControls(camera, renderer.domElement);
    //     orbit.update();
    //     orbit.addEventListener('change', () => {
    //         console.log('orbit change', camera.position)
    //         renderer.render(scene, camera);
    //     })
    //     return orbit
    // }, [])
    //
    // return <primitive object={controls}/>

    // useEffect(() => {
    //     console.log('OrbitControls useEffect')
    // }, [])

    // const [v] = React.useState(0)

    // return <mesh position={[-0.5, 0, 0]}>
    //     <boxBufferGeometry/>
    //     <meshStandardMaterial color={'blue'}/>
    // </mesh>

    return <mesh
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
}

export default React.forwardRef(OrbitControls)