import './MiniCart.scss';
import { MdShoppingCart } from 'react-icons/md';
import { useSelector } from 'react-redux';
import type { Cart } from '../../modals/Cart';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
const MiniCart = () => {
    const cart = useSelector((state: { cart: Cart }) => state.cart);
    const cartItemCount = cart.items.reduce((total, item) => total + item.qty, 0);
    const navigate = useNavigate();
    const { data: cartData, loading, error } = useFetch<Cart>(() => Promise.resolve(cart), [cart]);

     if (loading) return <div className="mini-cart">Loading...</div>;
    if (error) return <div className="mini-cart">Error loading cart</div>;
    return (
        <div className="mini-cart"  onClick={() => navigate('/cart')}> 
         {cartItemCount > 0 && <span className="mini-cart__total">TND{cartData?.total.toFixed(2)}</span>}
            <span className="mini-cart__icon"><MdShoppingCart /></span>

            <span className="mini-cart__badge">
          {cartItemCount}
        </span>
       
        </div>
    )
}

export default MiniCart;