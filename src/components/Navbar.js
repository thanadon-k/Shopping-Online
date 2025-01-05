import './Navbar.css';
import logo from '../assets/icons/logo.png';
import { SlMagnifier } from "react-icons/sl";
import { SlBasketLoaded } from "react-icons/sl";
import { SlUser } from "react-icons/sl";

function Navbar( {numOfCart} ) {
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
            <div className='cart'>
                <SlBasketLoaded size={24} style={{ strokeWidth: 5 }}/>
                {numOfCart > 0 && <p>{numOfCart}</p>}
            </div>
            <div className='profile'>
                <SlUser color="white" size={24} style={{ strokeWidth: 5 }}/>
            </div>
        </div>
    </div>
  );
}

export default Navbar;