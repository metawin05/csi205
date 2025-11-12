import { useState } from 'react'
import Counter from './Counter'

const Add = ({name}) => {
    let [a, setA] = useState(0)
    let [b, setB] = useState(0)

    return (
        <div className="m-auto mt-3 p-2 rounded-4" style={{
            width: 'fit-content',                 background: '#161616ff',
            border: '2px solid #202020ff',
        }}>
            <h2 className='text-center'>{name || 'ADDER'}</h2>
            <div className='d-flex justify-content-between'>
                <div className='badge bg-secondary'>A = {a}</div>
                <div className='badge bg-primary'>A + B  = {a + b}</div>
                <div className='badge bg-secondary'>B = {b}</div>
            </div>
            <div className='d-flex gap-2'>
                <Counter name={'A'} value={a} setValue={setA} />
                <Counter name={'B'} value={b} setValue={setB} />
            </div>
        </div>
    )
}

export default Add