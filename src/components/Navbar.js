import './Navbar.css';
import logo from '../assets/icons/logo.png';
import { SlMagnifier } from "react-icons/sl";
import { SlBasketLoaded } from "react-icons/sl";
import { SlUser } from "react-icons/sl";
import { Link } from "react-router-dom";

function Navbar( {cart} ) {
  return (
    <div className='navbar'>
        <div className='logo'>
            <img src={logo} alt="Logo" />
            <p>ON SHOPPING</p>
        </div>
        <div className='profile-cart'>
            <div className='search-box'>
                <p>Search</p>
                <SlMagnifier size={20} style={{ strokeWidth: 20 }}/>
            </div>
            <Link to="/placeorder" state={{ cart }}>
                <div className='cart'>
                    <SlBasketLoaded size={24} style={{ strokeWidth: 5 }}/>
                    {cart?.length > 0 && <p>{cart.length}</p>}
                </div>
            </Link>
            <div className='profile'>
                <SlUser color="white" size={24} style={{ strokeWidth: 5 }}/>
            </div>
        </div>
    </div>
  );
}

export default Navbar;