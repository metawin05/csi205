import '../App.css'
import Counter from '../components/Counter'
import Adder from '../components/Adder'
import Temperatures from '../components/Temperatures'
import Timer from "../components/Timer";
import { useState } from 'react'

const Components = () => {
    let [counter, setCounter] = useState(0)

    return (
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', border: '1px solid lightgray', borderRadius: '0.5rem', padding: '0.5rem', margin: '20px', textAlign: 'center'}}> 
            <Counter name={'Counter'} initial={0} type={'integer'} value={counter} setValue={setCounter} />
            <Adder name={'ADDER'} />
            <Timer name={'Timer'} />
            <Temperatures name={'Temperatures'} />
        </div>
    );
}

export default Components;