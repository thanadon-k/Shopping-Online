import React, { useState, useEffect, useRef } from 'react';
import './Product.css';
import { VscAdd } from "react-icons/vsc";
import { VscChromeMinimize } from "react-icons/vsc";

function Product({ product, onAddToCart }) {
    const [isClicked, setIsClicked] = useState(false);
    const cardRef = useRef(null);
    const [quantity, setQuantity] = useState(1);

    const handleProductClick = () => {
        setIsClicked(true);
    };

    const handleClickOutside = (event) => {
        if (cardRef.current && !cardRef.current.contains(event.target)) {
            setIsClicked(false);
            setQuantity(1)
        }
    };

    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const handleAddToCartClick = () => {
        product['orderQuantity'] = quantity;
        onAddToCart(product);
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div ref={cardRef} className='product' onClick={handleProductClick}>
            <div
                className='image'
                style={{
                    height: isClicked ? '90px' : '142px'
                }}>
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    style={{
                        width: isClicked ? '120px' : '140px'
                    }}
                ></img>
            </div>
            <div className='detail'>
                <p className='title'>{product.title}</p>
                <div>
                    <p className='price'>${Math.floor(product.price) * quantity}</p>
                    <div
                        className='quantity'
                        style={{
                            display: isClicked ? 'flex' : 'none'
                        }}>
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
                </div>
            </div>
            <button
                onClick={handleAddToCartClick}
                style={{
                    display: isClicked ? 'block' : 'none'
                }}>
                Add to Cart
            </button>
        </div>
    );
}

export default Product;