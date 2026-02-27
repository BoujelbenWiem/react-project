import './MiniCart.scss';
import { MdShoppingCart } from 'react-icons/md';
const MiniCart = () => {
    const cartItemCount = 3; 
    return (
        <div className="mini-cart"> 
            <span className="mini-cart__icon"><MdShoppingCart /></span>
            <span className="mini-cart__badge">
          {cartItemCount}
        </span>
        </div>
    )
}

export default MiniCart;