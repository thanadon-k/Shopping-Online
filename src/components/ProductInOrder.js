import React, { useState } from 'react';
import './ProductInOrder.css';
import { VscAdd } from "react-icons/vsc";
import { VscChromeMinimize } from "react-icons/vsc";

function ProductInOrder({ product, updateQuantity }) {
    const [quantity, setQuantity] = useState(product.orderQuantity);

    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
        updateQuantity(product.id, quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
            updateQuantity(product.id, quantity - 1);
        }
    };

    return (
        <div className='product-order'>
            <div className='info'>
                <div className='image'>
                    <img src={product.thumbnail}></img>
                </div>
                <div className='text'>
                    <p className='title'> {product.title}</p>
                    <p className='brand'><span>Brand:</span> {product.brand}</p>
                    <p className='code'><span>Product Code:</span> {product.sku}</p>
                    <p className='description'><span>Despcription:</span> {product.description}</p>
                </div>
            </div>
            <div className='quantity-price'>
                <div className='quantity'>
                    <div
                        className={`sub ${quantity === 1 ? 'disabled' : ''}`}
                        onClick={decreaseQuantity}
                    >
                        <VscChromeMinimize size={13} style={{ strokeWidth: 1 }} />
                    </div>
                    <p>{quantity}</p>
                    <div className='add' onClick={increaseQuantity}>
                        <VscAdd size={13} style={{ strokeWidth: 1 }} />
                    </div>
                </div>

                <p className='price'>${Math.floor(product.price)}</p>
                <p className='total'>${Math.floor(product.price) * quantity}</p>
            </div>
        </div>
    );
}

export default ProductInOrder;
