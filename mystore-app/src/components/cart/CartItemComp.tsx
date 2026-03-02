import { useAppDispatch } from "../../redux/store";
import { cartActions,syncCart } from "../../redux/slices/cartSlice";
import type { CartItem } from "../../modals/Cart";
import type { Product } from "../../modals/Product";
import useFetch from "../hooks/useFetch";
import './CartItemComp.scss';
import { getProductById } from "../../services/products.service";
type CartItemProps = {
    item: CartItem;
}
const CartItemComp :React.FC<CartItemProps> = ({ item }) => {
    const productId = item.id;
    const { data: product } = useFetch<Product>(() => getProductById(productId), [productId]);


    const dispatch = useAppDispatch();
    const increaseQty = () => {
        dispatch(cartActions.addItemToCart({ product: item, quantity: 1 }));
        dispatch(syncCart());
    }
    const decreaseQty = () => {
        dispatch(cartActions.addItemToCart({ product: item, quantity: -1 }));
        dispatch(syncCart());
    }
    const removeItem = () => {
        dispatch(cartActions.removeItemFromCart(item.id));
        dispatch(syncCart());
    }

    return (
        <div className="cart-item">

      <img
        src={`/images/products/${product?.categoryName}/${item.imageName}`}
        alt={item.name}
      />

      <div className="cart-item__info">
        <h4>{item.name}</h4>
        <p>${item.price}</p>
      </div>

      <div className="cart-item__qty">
        <button onClick={decreaseQty}>-</button>
        <span>{item.qty}</span>
        <button onClick={increaseQty}>+</button>
      </div>

      <div className="cart-item__total">
        ${(item.price * item.qty).toFixed(2)}
      </div>

      <button
        className="cart-item__remove"
        onClick={removeItem}
      >
        ✕
      </button>

    </div>
    );
} 

export default CartItemComp;
