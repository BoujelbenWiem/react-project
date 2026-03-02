import './MiniCart.scss';
import { MdShoppingCart } from 'react-icons/md';
import { useSelector } from 'react-redux';
import type { Cart } from '../../modals/Cart';
import { useNavigate } from 'react-router-dom';
const MiniCart = () => {
    const cart = useSelector((state: { cart: Cart }) => state.cart);
    const cartItemCount = cart.items.reduce((total, item) => total + item.qty, 0);
    const navigate = useNavigate();
    return (
        <div className="mini-cart"> 
            <span className="mini-cart__icon" onClick={() => navigate('/cart')}><MdShoppingCart /></span>
            <span className="mini-cart__badge">
          {cartItemCount}
        </span>
        </div>
    )
}

export default MiniCart;