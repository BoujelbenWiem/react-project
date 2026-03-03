import "./CartSummary.scss";
import type { Cart } from "../../modals/Cart";

const CartSummary: React.FC<{ cart: Cart }> = ({ cart }) => {
 

  return (
    <div className="cart-summary">
      <h2>Cart Summary</h2>
      <hr />

      <div className="cart-summary__row">
        <span>Subtotal</span>
        <span>${cart.subTotal.toFixed(2)}</span>
      </div>

      <div className="cart-summary__row">
        <span>Tax</span>
        <span>${cart.tax.toFixed(2)}</span>
      </div>

      <div className="cart-summary__total">
        <span>Total</span>
        <span>${cart.total.toFixed(2)}</span>
      </div>

      
    </div>
  );
};

export default CartSummary;