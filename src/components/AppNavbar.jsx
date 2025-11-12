import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const AppNavbar = ({products, carts, setToken}) => {
    return (
    <div className='d-flex justify-content-center gap-2'>
        <Link to={'Home'}>
            <Button variant='outline-primary'style={{textTransform: 'uppercase'}}>Home</Button>
        </Link>
        <Link to={'Calculator'}>
            <Button variant='outline-primary' style={{textTransform: 'uppercase'}}>Calculator</Button>
        </Link>
        <Link to={'Animation'}>
            <Button variant='outline-primary' style={{textTransform: 'uppercase'}}>Animation</Button>
        </Link>
        <Link to={'Components'}>
            <Button variant='outline-primary' style={{textTransform: 'uppercase'}}>Components</Button>
        </Link>
        <Link to={'Todos'}>
            <Button variant='outline-primary' style={{textTransform: 'uppercase'}}>Todos</Button>
        </Link>
        <Link to={'Products'}>
            <Button variant='outline-primary' style={{textTransform: 'uppercase'}}>Products ({products.length})</Button>
        </Link>
        <Link to={'Carts'}>
            <Button variant='outline-primary' style={{textTransform: 'uppercase'}}>Carts ({carts.length})</Button>
        </Link>
        <Link to={'Login'}>
            <Button variant='outline-danger' onClick={() => {
                setToken('')
            }}>Logout</Button>
        </Link>
    </div>
    );
}
 
export default AppNavbar;