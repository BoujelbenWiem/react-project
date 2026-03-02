import "./CartList.scss";
import CartItemComp from "./CartItemComp";
import CartSummary from "./CartSummary";
import type { Cart } from "../../modals/Cart";
import { useSelector } from "react-redux";

const CartList = () => {
  const cart = useSelector((state: { cart: Cart }) => state.cart);

  return (
    <div className="cart-page">
      <div className="cart-items">
        <h2>Your Cart</h2>

        {cart.items.length === 0 ? (
          <div className="empty-cart">Your cart is empty</div>
        ) : (
          cart.items.map(item => (
            <CartItemComp key={item.id} item={item} />
          ))
        )}
      </div>

      <div className="cart-summary-wrapper">
        <CartSummary cart={cart} />
      </div>
    </div>
  );
};

export default CartList;