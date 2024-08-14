import {useState} from "react";


function TT(props) {
    const [t, setT] = useState(0)

    return (
        <div>t={t}
            <button onClick={() => setT(t + 1)}>set</button>
        </div>
    )

}

export default TT