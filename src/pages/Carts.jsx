import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Products.css';

const Carts = ({carts, setCarts }) => {
    return (
        <>
            <div className="carts-container">
                <div className="carts-item-container">
                    {carts.map((cart) => {
                        return (
                            <Card style={{
                                width: '18rem', background: '#161616ff',
                                border: '2px solid #202020ff',
                                color: 'whitesmoke'
                            }} key={cart.id}>
                                <Card.Img variant="top" src={'https://static.vecteezy.com/system/resources/previews/028/099/987/large_2x/beauty-cosmetic-makeup-product-brushes-lipstick-nail-polish-collection-on-white-background-generative-ai-free-photo.jpg'} />
                                <Card.Body>
                                    <Card.Title>{cart.title}</Card.Title>
                                    <Card.Text><b>${cart.price.toFixed(2)}</b></Card.Text>
                                    <Button variant="outline-danger"
                                        onClick={() => setCarts(carts.filter((c) => c.id !== cart.id))}
                                    >Remove From Carts</Button>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </div>
                <h4 className='mt-4'>Items: <span className='px-3 bg-danger rounded-3 text-white'>{carts.length}</span> items - Total Price: <span className='px-3 bg-success rounded-3 text-white'>${carts.reduce((total, cart) => total + cart.price, 0).toFixed(2)}</span></h4>
            </div >
        </>
    );
}

export default Carts;