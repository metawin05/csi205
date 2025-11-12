import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './style.css';

const Products = ({ products, carts, setCarts }) => {
    return (
        <>
            <div className="products-container">
                <div className="products-item-container">
                    {products.map((product) => {
                        return (
                            <Card style={{ width: '18rem' }} key={product.id}>
                                <Card.Img variant="top" src={'https://static.vecteezy.com/system/resources/previews/028/099/987/large_2x/beauty-cosmetic-makeup-product-brushes-lipstick-nail-polish-collection-on-white-background-generative-ai-free-photo.jpg'} />
                                <Card.Body>
                                    <Card.Title>{product.title}</Card.Title>
                                    <Card.Text><b>${product.price}</b></Card.Text>

                                    {carts.find((cart) => cart.id === product.id ) ? (
                                        <span className='badge bg-danger'>Added</span>
                                    ) : (
                                            <Button variant="outline-primary" onClick={() => {
                                                setCarts([...carts, product])
                                            }}>Add to Carts</Button>
                                        )
                                    }
                                </Card.Body>
                            </Card>
                        )
                    })}
                </div>
            </div >
        </>
    );
}

export default Products;