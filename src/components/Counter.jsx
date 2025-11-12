import { useEffect} from "react"

const Counter = ({name, initial, type, value, setValue}) => {
    // let [value, setValue] = useState(initial)

    useEffect(() => {
        setValue(initial || 0)
    }, [initial])

    return (
        <div className="border border-black border-2 m-auto mt-3 p-3 rounded-4 bg-secondary-subtle" style={{ width: 'fit-content' }}>
            <h2 className="text-center">{name || 'Value'}</h2>
            <div className="d-flex justify-content-between align-items-center gap-3">
                <button className="btn btn-danger border-0" onClick={() => setValue((p) => p - 1)}>-</button>
                <div>{type === 'real' ? value.toFixed(2) : value}</div>
                <button className="btn btn-success border-0" onClick={() => setValue((p) => p + 1)}>+</button>
            </div>
        </div>
    )
}

export default Counter