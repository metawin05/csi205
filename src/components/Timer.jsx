import { useState, useRef, useEffect } from 'react'

const formatTime = (sec) => {
    const s = sec % 60
    const m = Math.floor(sec / 60) % 60
    const h = Math.floor(sec / 3600) % 24
    const d = Math.floor(sec / (3600 * 24))
    let str = ''
    if (d > 0) str += `${d}d `
    if (h > 0) str += `${h}h `
    if (m > 0) str += `${m}m `
    str += `${s}s`
    return str.trim()
}

const Timer = () => {
    const [second, setSecond] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const intervalRef = useRef(null)

    // Start/Stop timer
    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setSecond(prev => prev + 1)
            }, 1000)
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }
        // Cleanup on unmount
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }
    }, [isRunning])

    const handleReset = () => {
        setIsRunning(false)
        setSecond(0)
    }

    const handlePlayPause = () => {
        setIsRunning(running => !running)
    }

    return (
        <div className=''
            style={{
                background: '#d3d3d3',
                border: '2px solid #333',
                borderRadius: '12px',
                padding: '14px 16px 16px 16px',
                width: '290px',height: '180px',
                boxSizing: 'border-box',
                margin: '12px auto',
                // boxShadow: '2px 2px 8px #ccc'
            }}
        >
            <h1
                className='text-center text-black fw-bold'
                style={{
                    // color: '#000000ff',
                    textAlign: 'center',
                    fontSize: '2rem',
                    marginBottom: '12px'
                }}
            >
                TIMER
            </h1>
            <input
                className='form-control text-end fs-3 fw-bold mb-3'
                style={{
                    background: '#fff',
                    border: '2px solid #888',
                    borderRadius: '8px',
                    height: '44px',
                    fontSize: '2rem',
                    textAlign: 'right',
                    paddingRight: '16px'
                }}
                value={formatTime(second)}
                readOnly
            />
            <div className='d-flex gap-3 mt-1'>
                <button
                    className='fw-bold'
                    style={{
                        background: '#e53935',
                        color: '#fff',
                        flex: 1,
                        fontSize: '1.1rem',
                        borderRadius: '8px',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        height: '44px'
                    }}
                    onClick={handleReset}
                >
                    <span style={{fontSize: '1.3em'}}>⭮</span> Reset
                </button>
                <button
                    className='fw-bold'
                    style={{
                        background: isRunning ? '#fbc02d' : '#388e3c',
                        color: '#fff',
                        flex: 1,
                        fontSize: '1.1rem',
                        borderRadius: '8px',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        height: '44px'
                    }}
                    onClick={handlePlayPause}
                >
                    {isRunning ? <><i className="bi bi-pause"></i> Pause</> : <><i className="bi bi-play"></i> Run</>}
                </button>
            </div>
        </div>
    )
}

export default Timer