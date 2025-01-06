import './DiscountButton.css';

function DiscountButton({ title, isSelected, onClick, isAnySelected }) {
    return (
        <div
            className="discount-button"
            style={{
                opacity: !isSelected && isAnySelected ? 0.5 : 1, 
            }}
        >
            <p>{title}</p>
            <button
                onClick={onClick}
                style={{
                    backgroundColor: isSelected ? 'black' : 'white',
                    color: isSelected ? 'white' : 'black',
                }}
            >
                Apply
            </button>
        </div>
    );
}

export default DiscountButton;
