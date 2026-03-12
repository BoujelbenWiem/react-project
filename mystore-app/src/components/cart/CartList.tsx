import "./CartList.scss";
import CartItemComp from "./CartItemComp";
import CartSummary from "./CartSummary";
import type { Cart } from "../../modals/Cart";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/slices/cartSlice";

const CartList = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state: { cart: Cart }) => state.cart);
  const [discountCode, setDiscountCode] = useState("");
   const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/cart/checkout");
  };
  const handleApplyDiscount = () => {
    dispatch(cartActions.applyDiscountCode({code: discountCode}));
    dispatch(syncCart());
  };

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
        <div >
          <label>
            Discount Code:
          </label>
          <input type="text" placeholder="Enter discount code" className="cart-summary-wrapper__discount" value={discountCode} onChange={(e)=>setDiscountCode(e.target.value)} />
          <button onClick={handleApplyDiscount}>Apply</button>
          <button
        className="cart-summary-wrapper__checkout"
        disabled={cart.items.length === 0}
        onClick={handleCheckout}
      >
        Proceed to Checkout
      </button >
        </div>
      </div>
    </div>
  );
};

export default CartList;