import CartSummary from "../cart/CartSummary"
import './CheckoutForm.scss';
import { useSelector } from "react-redux";
import type { Cart } from "../../modals/Cart";


const CheckoutForm = ({ onPlaceOrder }: { onPlaceOrder: () => void }) => {
    const cart = useSelector((state: { cart: Cart }) => state.cart);
    return (    
        <div className="checkout-form">
            <h2>Checkout Form</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                onPlaceOrder();
            }}>
            <div className="checkout-form__section">
                <h3>Billing Information</h3>
                <label>
                    Civility
                    <select>
                        <option value="mr">Mr.</option>
                        <option value="ms">Ms.</option>
                    </select>
                </label>
                <label>
                    First Name
                    <input type="text" placeholder="First Name" />
                </label>
                <label>
                    Last Name
                    <input type="text" placeholder="Last Name" />   
                </label>
                <label>
                    Company Name
                    <input type="text" placeholder="Company Name (optional)" />
                </label>
                <label>
                    Adress
                    <input type="text" placeholder="Street Address" />
                    <input type="text" placeholder="Apartment, suite, etc. (optional)" />
                </label>
                <label>
                    Town / City
                    <input type="text" placeholder="Town / City" />
                </label>
                <label>
                    State / County
                    <input type="text" placeholder="State / County" />
                </label>
                <label>
                    Postcode / ZIP
                    <input type="text" placeholder="Postcode / ZIP" />
                </label>
                <label>
                    Email Address
                    <input type="email" placeholder="Email Address" />
                </label>
                <label>
                    Phone
                    <input type="tel" placeholder="Phone Number" />
                </label>
            </div>
            <div className="checkout-form__section">
                <h3>Ship to a different address?</h3>
                <label>
                    Civility
                    <select>
                        <option value="mr">Mr.</option>
                        <option value="ms">Ms.</option>
                    </select>
                </label>
                <label>
                    First Name
                    <input type="text" placeholder="First Name" />
                </label>
                <label>
                    Last Name
                    <input type="text" placeholder="Last Name" />   
                </label>
                <label>
                    Company Name
                    <input type="text" placeholder="Company Name (optional)" />
                </label>
                <label>
                    Adress
                    <input type="text" placeholder="Street Address" />
                    <input type="text" placeholder="Apartment, suite, etc. (optional)" />
                </label>
                <label>
                    Town / City
                    <input type="text" placeholder="Town / City" />
                </label>
                <label>
                    State / County
                    <input type="text" placeholder="State / County" />
                </label>
                <label>
                    Postcode / ZIP
                    <input type="text" placeholder="Postcode / ZIP" />
                </label>
                <label>
                    Order Notes
                    <textarea placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
                </label>
            </div>
            <div className="checkout-form__section">
                <h3>Your Order</h3>
                <CartSummary cart={cart} />
            </div>
            <button type="submit" className="checkout-form__submit">Place Order</button>
            </form>
        </div>
    )
}

export default CheckoutForm;