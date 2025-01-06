import './DropdownDiscount.css';
import { VscChevronDown } from "react-icons/vsc";
import { VscChevronUp } from "react-icons/vsc";

function DropdownDiscount( {title, state, updateState ,isDisable} ) {

    return (
        <div 
            className='dropdown-discount'
            onClick={() => updateState(title)}
            style={{
                borderBottom: state ? 'none' : '1px solid black',
                pointerEvents: isDisable ? 'none' : 'auto',
                opacity: isDisable ? 0.3 : 1
            }}>
            <p>{title}</p>
            {state ? <VscChevronUp size={20} style={{ strokeWidth: 1 }}/> : <VscChevronDown size={20} style={{ strokeWidth: 1 }} />}
        </div>
    );
}

export default DropdownDiscount;
