import React, { useEffect, useState } from 'react'
const DUm = () => {
    const [state, setState] = useState(0)
    const [state2, setState2] = useState(0)
    useEffect(() => {
        console.warn("useEffect runs")
    },[state2])
    return   (
        <>
            {console.warn("innner area runs")}
            <button onClick={() => setState(state + 1)}>CLick me</button>
            <button onClick={() => setState2(state2 + 1)}>CLick me 2</button>
            <h1>{state}</h1>
        </>
    )
}
export default DUm