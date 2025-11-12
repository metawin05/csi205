import Form from 'react-bootstrap/Form';
import { useRef } from 'react'
import { verifyUser } from '../data/users';

const Login = ({ setToken, setRole }) => {
    const userRef = useRef()
    const passRef = useRef()

    return (
        <div className='text-center' style={{ width: '300px', margin: '2rem auto' }}>
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control
                type="text"
                id="username"
                placeholder='user'
                style={{ textAlign: 'center' }}
                ref={userRef}
            />
            <Form.Label htmlFor="password">password</Form.Label>
            <Form.Control
                type="password"
                id="password"
                placeholder='pass'
                style={{ textAlign: 'center' }}
                ref={passRef}
            />
            <button className='btn btn-success mt-3' onClick={() => {
                const user = userRef.current.value.trim()
                const pass = passRef.current.value.trim()
                const userInfo = verifyUser(user, pass)
                userRef.current.value = ''
                passRef.current.value = ''

                if (userInfo === null) {
                    alert('Invalid User')
                    userRef.current.focus()
                } else {
                    setToken(userInfo.token)
                    setRole(userInfo.role)
                }
            }}>Login</button>
        </div>
    );
}

export default Login;