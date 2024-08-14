import ThreeTest from "./three-test";
import {useRef, useState} from "react";
import {Canvas} from "./three";
import TT from "./tt";
import MyThree from "./mythree";
// import FiberTest from "./fiber-test";


function Home(props) {


    const [t, setT] = useState(0)
    return (
        <div className="home">
            <div style={{width: '100%'}}>
                <MyThree/>
            </div>
            <div>
                <TT/>
            </div>
            <div>
                <button onClick={() => {
                    setT(t + 1)
                }}>home{t}</button>
            </div>
            {/*<ThreeTest/>*/}

            {/*<FiberTest/>*/}
        </div>
    )
}

export default Home