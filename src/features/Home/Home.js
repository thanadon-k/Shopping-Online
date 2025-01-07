import React, { useState, useEffect } from 'react';
import './Home.css';
import Navbar from '../../components/Navbar';
import adsLeft from '../../assets/images/pexels-borevina.jpg';
import adsRight from '../../assets/images/pexels-mnzoutfits.jpg';
import Product from '../../components/Product';
import useFetch from '../../hook/useFetch';
import { ClipLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const [ catalog, setCatalog ] = useState('Clothing');
  const [cart, setCart] = useState([]);
  const { data, isLoading, error, fetchData } = useFetch();
  
  const selectCatalog = (select) => {
    setCatalog(select);
  }

  useEffect(() => {
    fetchData(catalog)
  }, [catalog]);

  if (error) {
    toast.error(error)
  }

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    console.log(cart);
  };

  return (
    <div className='home'>
      {isLoading && <div className='loader'>
        <ClipLoader color="#000000" size={50} />
      </div>}
      <ToastContainer />
      <Navbar cart={cart}/>
      <div className='ads'>
        <div className='left'>
          <img src={adsLeft} alt="Ads" />
          <p>SPECIAL OFFER</p>
          <p>FOR JANUARY</p>
        </div>
        <div className='right'>
          <img src={adsRight} alt="Ads" />
          <p>SHOP SMART</p>
          <p>SAVE BIG</p>
        </div>
      </div>
      <div className='catalog'>
        <p className= {`${catalog === 'Clothing' ? 'active' : ''}`} onClick={() => selectCatalog('Clothing')}>Clothing</p>
        <p className= {`${catalog === 'Shoes' ? 'active' : ''}`} onClick={() => selectCatalog('Shoes')}>Shoes</p>
        <p className= {`${catalog === 'Bags' ? 'active' : ''}`} onClick={() => selectCatalog('Bags')}>Bags</p>
        <p className= {`${catalog === 'Accessories' ? 'active' : ''}`} onClick={() => selectCatalog('Accessories')}>Accessories</p>
        <p className= {`${catalog === 'Laptops' ? 'active' : ''}`} onClick={() => selectCatalog('Laptops')}>Laptops</p>
        <p className= {`${catalog === 'Furniture' ? 'active' : ''}`} onClick={() => selectCatalog('Furniture')}>Furniture</p>
      </div>
      <div className='products'>
        {data.length > 0 ? (
          data.map((product) => (
            <Product 
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))
        ) : (
          <p className='no-product'>
            No products available.
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;