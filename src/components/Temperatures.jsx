import { useState } from 'react'
import Counter from './Counter'

const Temperatures = ({ name }) => {
    let [a, setA] = useState(0)
    let [b, setB] = useState(0)
    let [c, setC] = useState(0)

    return (
        <div className="m-auto mt-3 p-2 rounded-4" style={{
            width: 'fit-content',                 background: '#161616ff',
            border: '2px solid #202020ff',
        }}>
            <h2 className='text-center'>{name || 'ADDER'}</h2>
            <div className='d-flex justify-content-around'>
                <div className='badge bg-primary p-3'>{a.toFixed(2)} C</div>
                <div className='badge bg-primary p-3'>{b.toFixed(2)} F</div>
                <div className='badge bg-primary p-3'>{c.toFixed(2)} K</div>
            </div>
            <div className='d-flex gap-2'>
                <Counter name={'CELSIUS'} value={a.toFixed(2)} setValue={setA} />
                <Counter name={'FAHRENHEIT'} value={b.toFixed(2)} setValue={setB} />
                <Counter name={'KELVIN'} value={c.toFixed(2)} setValue={setC} />
            </div>
        </div>
    )
}

export default Temperatures