import React, { useState } from 'react';
import Navbar from '../../components/Navbar'
import './PlaceOrder.css';
import { useLocation } from "react-router-dom";
import ProductInOrder from '../../components/ProductInOrder';
import { VscChevronDown } from "react-icons/vsc";
import { VscChevronUp } from "react-icons/vsc";

function PlaceOrder() {
    const location = useLocation();
    const [cart, setCart] = useState(location.state?.cart || []);

    const subTotalPrice = cart.reduce((sum, product) => sum + Math.floor(product.price) * Math.floor(product.orderQuantity), 0);

    const [isCoupon, setIsCoupon] = useState(false);
    const [isOntop, setIsOntop] = useState(false);
    const [value, setValue] = useState('');

    const toggleCoupon = () => {
        setIsCoupon(!isCoupon);
    };

    const toggleOntop = () => {
        setIsOntop(!isOntop);
    };

    const handleChange = (event) => {
        setValue(event.target.value);  
    };

    const updateQuantity = (id, quantity) => {
        const updatedCart = cart.map(item => 
            item.id === id ? { ...item, orderQuantity: quantity } : item
        );
        setCart(updatedCart);
    };

    return (
        <div className='placeorder'>
            <Navbar cart={cart} />
            <div className='order'>
                <div className='detail'>
                    <p className='title'>Shopping Cart</p>
                    <div className='meta'>
                        <p>PRODUCT DETAILS</p>
                        <div className='price'>
                            <p>QUANTITY</p>
                            <p>PRICE</p>
                            <p>TOTAL</p>
                        </div>
                    </div>
                    <div className='products'>
                        {cart.length > 0 ? (
                            cart.map((product) => (
                                <ProductInOrder
                                    product={product}
                                    updateQuantity={updateQuantity}
                                />
                            ))
                        ) : (
                            <p>Loading products...</p>
                        )}
                    </div>
                </div>
                <div className='discount-summary'>
                    <div className='summary'>
                        <p className='title'>Order Summary</p>
                        <div class="price">
                            <p class="label">Retail Price:</p>
                            <p class="value">฿0</p>
                        </div>
                        <div class="price">
                            <p class="label">Subtotal:</p>
                            <p class="value">฿{Math.floor(subTotalPrice)}</p>
                        </div>
                        <div class="price">
                            <p class="label">Shipping fee:</p>
                            <p class="value">฿0</p>
                        </div>
                        <div class="price">
                            <p class="label">Grand Total:</p>
                            <p class="value">฿{Math.floor(subTotalPrice)}</p>
                        </div>
                        <p className='reward-point'>Reward <span>40</span> ON SHOPPING Point</p>
                    </div>
                    <div className='discount'>
                        <div 
                            className='coupon' 
                            onClick={toggleCoupon}
                            style={{
                                borderBottom: isCoupon ? 'none' : '1px solid black'
                            }}>
                            <p>Coupon</p>
                            {isCoupon ? <VscChevronUp size={20} style={{ strokeWidth: 1 }}/> : <VscChevronDown size={20} style={{ strokeWidth: 1 }}/>}
                        </div>
                        <div 
                            className='toggle'
                            style={{
                                display: isCoupon ? 'block' : 'none'
                            }}>
                            <div className='apply'>
                                <p>Discount: $10</p>
                                <button>Apply</button>
                            </div>
                            <div className='apply'>
                                <p>Discount: 10%</p>
                                <button>Apply</button>
                            </div>
                        </div>
                        <div 
                            className='ontop' 
                            onClick={toggleOntop}
                            style={{
                                borderBottom: isOntop ? 'none' : '1px solid black'
                            }}>
                            <p>Ontop</p>
                            {isOntop ? <VscChevronUp size={20} style={{ strokeWidth: 1 }}/> : <VscChevronDown size={20} style={{ strokeWidth: 1 }}/>}
                        </div>
                        <div 
                            className='toggle'
                            style={{
                                display: isOntop ? 'block' : 'none'
                            }}>
                            <div className='apply'>
                                <p>Discount: 15% Off on Clothing</p>
                                <button>Apply</button>
                            </div>
                            <div className='use-point'>
                                <h5>ON SHOPPING Point</h5>
                                <div className='form'>
                                    <input 
                                        type='text'
                                        value={value} 
                                        onChange={handleChange} 
                                        placeholder="Input Point"
                                    />
                                    <button>Apply</button>
                                </div>
                                <p>Max Available: {Math.floor(20/100 * subTotalPrice)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlaceOrder;