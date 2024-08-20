import {Suspense, forwardRef, useEffect, useMemo} from "react";
import Room from "./Room";

// 全局
let dracoLoader

const FloorPlan = forwardRef((props, ref) => {
    const {Addons, Fiber, Drei} = window.ThreeLibs
    const {file, onLoad, ...others} = props

    if (!dracoLoader) {
        dracoLoader = new Addons.DRACOLoader()
        dracoLoader.setDecoderPath('${appRes}/')
    }

    const {scene} = Fiber.useLoader(Addons.GLTFLoader, ('${appRes}/' + file), loader => {
        loader.setDRACOLoader(dracoLoader)
        if (typeof onLoad === 'function') loader.manager.onLoad = onLoad
    })

    useEffect(() => {
        scene?.traverse?.(child => {
            let materialOriginal
            if (child.material) {
                if (Array.isArray(child.material)) {
                    materialOriginal = child.material.map(it => it?.clone?.())
                } else {
                    materialOriginal = child.material?.clone?.()
                }
            }
            child.userData = {
                ...child.userData,
                materialOriginal,
            }
        })
    }, [])

    console.log('plan scene', scene)

    return (
        <primitive {...others} object={scene} ref={ref}>
            {scene?.children?.map?.((it, index) => (
                <>
                    {(it?.name?.startsWith?.('unit')) ? (
                        <Room object={it}/>
                    ) : (
                        <primitive object={it}/>
                    )}
                </>
            ))}
        </primitive>
    )
})

const FloorPlanWrapper = forwardRef((props, ref) => {
    return <Suspense fallback={null}><FloorPlan ref={ref} {...props}/></Suspense>
})

export default FloorPlanWrapper