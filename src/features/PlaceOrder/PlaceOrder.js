import React, { useState } from 'react';
import Navbar from '../../components/Navbar'
import './PlaceOrder.css';
import { useLocation } from "react-router-dom";
import ProductInOrder from '../../components/ProductInOrder';
import DiscountButton from '../../components/DiscountButton';
import DropdownDiscount from '../../components/DropdownDiscount';
import credit from '../../assets/images/creditcard.png';
import paypal from '../../assets/images/paypal.png';
import noproduct from '../../assets/images/noproduct.jpeg';

function PlaceOrder() {
    const location = useLocation();
    const [cart, setCart] = useState(location.state?.cart || []);

    const [isCoupon, setIsCoupon] = useState(false);
    const [isOntop, setIsOntop] = useState(false);
    const [isSeasonal, setIsSeasonal] = useState(false);
    const [point, setPoint] = useState('');
    const [shipping, setShipping] = useState(0);

    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [selectedOnTop, setSelectedOnTop] = useState(null);
    const [selectedSeasonal, setSelectedSeasonal] = useState(null);
    const [selectedShippng, setSelectedShippng] = useState(null);
    const [selectedMethod, setSelectedMethod] = useState(null);

    const subTotalPrice = cart.reduce((sum, product) => sum + Math.floor(product.price) * Math.floor(product.orderQuantity), 0);
    const grandTotalPrice = Math.floor(subTotalPrice) - (selectedCoupon?.discount ?? 0) - (selectedOnTop?.discount ?? 0) - (selectedSeasonal?.discount ?? 0) + (shipping)

    //check button 
    const isAnySelectedCoupon = !!selectedCoupon;
    const isAnySelectedOnTop = !!selectedOnTop;
    const isAnySelectedSeasonal = !!selectedSeasonal;

    //toggle show all discount
    const updateDiscountState = (type) => {
        if (type === 'Coupon') setIsCoupon(!isCoupon);
        if (type === 'On Top') setIsOntop(!isOntop);
        if (type === 'Seasonal') setIsSeasonal(!isSeasonal);
    };

    //input point
    const handleChange = (event) => {
        setPoint(event.target.value);
    };

    //update quantity after add sub in ProductInOrder component
    const updateQuantity = (id, quantity) => {
        const updatedCart = cart.map(item =>
            item.id === id ? { ...item, orderQuantity: quantity } : item
        );
        setCart(updatedCart);

        //reset all discount
        setSelectedCoupon(null);
        setIsCoupon(false);

        setSelectedOnTop(null);
        setIsOntop(false);

        setSelectedSeasonal(null);
        setIsSeasonal(false);

    };

    const applyCoupon = (id, coupon, discount) => {
        if (selectedCoupon?.id === id) {
            setSelectedCoupon(null);

            setSelectedOnTop(null);
            setIsOntop(false);

            setSelectedSeasonal(null);
            setIsSeasonal(false);
            return;
        }
        setSelectedCoupon({ id: id, title: `Discount ${coupon}:`, discount: discount });
    };

    const applyOnTopPercentCatalog = (id, catalog, percent) => {
        if (selectedOnTop?.id === id) {
            setSelectedOnTop(null);

            setSelectedSeasonal(null);
            setIsSeasonal(false);
            return;
        }

        const totalByCatalog = cart.reduce((sum, product) => {
            if (product.tags.map(tag => tag.toLowerCase()).includes(catalog.toLowerCase())) {
                return sum + Math.floor(product.price) * Math.floor(product.orderQuantity);
            }
            return sum;
        }, 0);

        const discountValue = (percent / 100) * totalByCatalog;

        setSelectedOnTop({ id: id, title: `Discount: ${percent}% Off on ${catalog}`, discount: discountValue.toFixed(2) });
    };

    const applyOnTopPoint = (id, point, maxPoint) => {
        if (selectedOnTop?.id === id) {
            setSelectedOnTop(null);

            setSelectedSeasonal(null);
            setIsSeasonal(false);
            return;
        }

        if (point === '' || point > maxPoint) {
            alert(`You cannot use more than ${maxPoint} points.`);
            return;
        }
        setSelectedOnTop({ id: id, title: `Points ${point} Points:`, discount: point });
    };

    const applySeasonalEveryXdiscountY = (id, every, discount) => {
        if (selectedSeasonal?.id === id) {
            setSelectedSeasonal(null);
            return;
        }
        const discountValue = Math.floor(subTotalPrice / every) * discount
        setSelectedSeasonal({ id: id, title: `Discount: ${discount} at every ${every}:`, discount: discountValue });
    };


    const handleSelectShippng = (shipping) => {
        if (cart.length === 0) return;

        if (shipping === 'standard') setShipping(3);
        if (shipping === 'express') setShipping(10);

        setSelectedShippng(shipping);
    };

    const handleSelectMethod = (method) => {
        if (cart.length === 0) return;

        setSelectedMethod(method);
    };

    return (
        <div className='placeorder'>
            <Navbar cart={cart} />
            <div className='shopping'>
                <div className='shopping-info'>
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
                            <div className='no-product'>
                                <img src={noproduct} alt="No Product" />
                                <p>No products in the cart.</p>
                            </div>
                        )}
                    </div>
                    <div className='addr-title'>
                        <p className='title'>Shopping Address</p>
                        <p className='add-addr'>Add New Address</p>
                    </div>
                    <div className='all-address'>
                        <div className='address'>
                            <div className='name-edit'>
                                <p className='name'>Thanadon Khonthang</p>
                                <p className='edit'>Edit</p>
                            </div>
                            <p className='tel'>0987654321</p>
                            <p className='location'>1 Soi Chalong Krung 1, Lat Krabang Subdistrict, Lat Krabang District, Bangkok 10520</p>
                        </div>
                    </div>
                    <p className='title'>Choose Your Shopping Options</p>
                    <div className='shipping-option'>
                        <div className='option' onClick={() => handleSelectShippng('standard')}>
                            <div className='select'>
                                <div className={selectedShippng === 'standard' ? 'selected' : ''}></div>
                            </div>
                            <div className='shipping'>
                                <p className='name'>STANDARD SHIPPING</p>
                                <p className='detail'>$3 Orders placed now expected to arrive before Monday, July 12 - Wednesday, July 14 </p>
                            </div>
                        </div>
                        <div className='option' onClick={() => handleSelectShippng('express')}>
                            <div className='select'>
                                <div className={selectedShippng === 'express' ? 'selected' : ''}></div>
                            </div>
                            <div className='shipping'>
                                <p className='name'>EXPRESS SHIPPING</p>
                                <p className='detail'>$10 Orders placed now expected to arrive before Monday, July 12 - Wednesday, July 14 </p>
                            </div>
                        </div>
                    </div>
                    <p className='title'>Payment Method</p>
                    <div className='payment-method'>
                        <div className='method' onClick={() => handleSelectMethod('credit')}>
                            <div className='select'>
                                <div className={selectedMethod === 'credit' ? 'selected' : ''}></div>
                            </div>
                            <img src={credit} alt="Credit" />
                            <p>Credit/Debit Card</p>
                        </div>
                        <div className='method' onClick={() => handleSelectMethod('paypal')}>
                            <div className='select'>
                                <div className={selectedMethod === 'paypal' ? 'selected' : ''}></div>
                            </div>
                            <img src={paypal} alt="Credit" />
                            <p>PayPal</p>
                        </div>
                    </div>
                </div>
                <div className='discount-summary'>
                    <div className='summary'>
                        <p className='title'>Order Summary</p>
                        <div class="price">
                            <p class="label">Retail Price:</p>
                            <p class="value">$0</p>
                        </div>
                        <div class="price">
                            <p class="label">Subtotal:</p>
                            <p class="value">${Math.floor(subTotalPrice)}</p>
                        </div>
                        <div class="price">
                            <p class="label">Shipping fee:</p>
                            <p class="value">${shipping}</p>
                        </div>
                        {selectedCoupon && <div class="price">
                            <p class="label">{selectedCoupon.title}</p>
                            <p class="value">-${selectedCoupon.discount}</p>
                        </div>}
                        {selectedOnTop && <div class="price">
                            <p class="label">{selectedOnTop.title}</p>
                            <p class="value">-${selectedOnTop.discount}</p>
                        </div>}
                        {selectedSeasonal && <div class="price">
                            <p class="label">{selectedSeasonal.title}</p>
                            <p class="value">-${selectedSeasonal.discount}</p>
                        </div>}
                        <div class="total-price">
                            <p class="label">Grand Total:</p>
                            <p class="value">${parseFloat(grandTotalPrice) === parseInt(grandTotalPrice) ? parseInt(grandTotalPrice) : grandTotalPrice.toFixed(2)}</p>
                        </div>
                        <p className='reward-point'>Reward <span>40</span> ON SHOPPING Point</p>
                    </div>
                    <div className='discount'>
                        <DropdownDiscount
                            title={'Coupon'}
                            state={isCoupon}
                            isDisable={cart.length === 0} 
                            onClick={() => updateDiscountState('Coupon')}/>
                        <div
                            className='toggle'
                            style={{
                                display: isCoupon ? 'block' : 'none'
                            }}>
                            <DiscountButton
                                title={'Discount: $10'}
                                isSelected={selectedCoupon?.id === 0}
                                isAnySelected={isAnySelectedCoupon}
                                onClick={() => applyCoupon(0, '$10', 10)}
                            />
                            <DiscountButton
                                title={'Discount: 10%'}
                                isSelected={selectedCoupon?.id === 1}
                                isAnySelected={isAnySelectedCoupon}
                                onClick={() => applyCoupon(1, '10%', (10 / 100 * subTotalPrice).toFixed(2))}
                            />
                        </div>
                        <DropdownDiscount
                            title={'On Top'}
                            state={isOntop} 
                            isDisable={!selectedCoupon} 
                            onClick={() => updateDiscountState('On Top')}/>
                        <div
                            className='toggle'
                            style={{
                                display: isOntop ? 'block' : 'none'
                            }}>
                            <DiscountButton
                                title={'Discount: 15% Off on Clothing'}
                                isSelected={selectedOnTop?.id === 0}
                                isAnySelected={isAnySelectedOnTop}
                                onClick={() => applyOnTopPercentCatalog(0, 'Clothing', 15)}
                            />
                            <div
                                className='use-point'
                                style={{
                                    opacity: !(selectedOnTop?.id === 1) && isAnySelectedOnTop ? 0.5 : 1,
                                }}>
                                <h5>ON SHOPPING Point</h5>
                                <div className='form'>
                                    <input
                                        type='text'
                                        value={point}
                                        onChange={handleChange}
                                        placeholder="Input Point"
                                    />
                                    <button
                                        onClick={() => applyOnTopPoint(1, point, Math.floor(20 / 100 * subTotalPrice))}
                                        style={{
                                            backgroundColor: selectedOnTop?.id === 1 ? 'black' : 'white',
                                            color: selectedOnTop?.id === 1 ? 'white' : 'black'
                                        }}>
                                        Apply
                                    </button>
                                </div>
                                <p>Max Available: {Math.floor(20 / 100 * subTotalPrice)}</p>
                            </div>
                        </div>
                        <DropdownDiscount
                            title={'Seasonal'}
                            state={isSeasonal}
                            isDisable={!selectedOnTop} 
                            onClick={() => updateDiscountState('Seasonal')}/>
                        <div
                            className='toggle'
                            style={{
                                display: isSeasonal ? 'block' : 'none'
                            }}>
                            <DiscountButton
                                title={'Discount: $10 at every $40'}
                                isSelected={selectedSeasonal?.id === 0}
                                isAnySelected={isAnySelectedSeasonal}
                                onClick={() => applySeasonalEveryXdiscountY(0, 40, 10)} />
                        </div>
                    </div>
                    <button>
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PlaceOrder;