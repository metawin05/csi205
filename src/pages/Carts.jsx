import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './style.css';

const Carts = ({carts, setCarts }) => {
    return (
        <>
            <div className="carts-container">
                <div className="carts-item-container">
                    {carts.map((cart) => {
                        return (
                            <Card style={{ width: '100%' }} key={cart.id}>
                                <Card.Img variant="top" src={'https://static.vecteezy.com/system/resources/previews/028/099/987/large_2x/beauty-cosmetic-makeup-product-brushes-lipstick-nail-polish-collection-on-white-background-generative-ai-free-photo.jpg'} />
                                <Card.Body>
                                    <Card.Title>{cart.title}</Card.Title>
                                    <Card.Text><b>${cart.price}</b></Card.Text>
                                    <Button variant="outline-danger"
                                        onClick={() => setCarts(carts.filter((c) => c.id !== cart.id))}
                                    >Remove From Carts</Button>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </div>
            </div >
        </>
    );
}

export default Carts;