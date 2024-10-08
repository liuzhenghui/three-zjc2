import {useEffect, useState} from "react";

function Room(props) {
    const {Addons, Fiber, Drei} = window.ThreeLibs
    const {object} = props
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState()

    useEffect(() => {
        // setTimeout(() => {
        //     setLoading(false)
        // }, 2000)
    }, []);

    return (
        <primitive
            object={object}
            onPointerEnter={e => {
                e.srcElement.style.cursor = 'pointer'
                object.__label2.style.display = 'block'
            }}
            onPointerOut={e => {
                e.srcElement.style.cursor = 'auto'
                object.__label2.style.display = 'none'
            }}
        >
            <Drei.Html
                className="room-label"
                ref={r => object.__label = r}
                position={[0, 6, -1]}
            >
                <div>xxx有限公司</div>
            </Drei.Html>
            <Drei.Html
                className="room-label room-detail"
                ref={r => object.__label2 = r}
                transform1
                position={[0, 12, 0]}
            >
                <div>3107 213平方</div>
                <div>xxx有限公司</div>
                <div>2026年12月31日</div>
            </Drei.Html>
        </primitive>
    )
}

export default Room