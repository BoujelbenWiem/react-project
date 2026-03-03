import CartSummary from "../cart/CartSummary"
import './CheckoutForm.scss';
import { useSelector } from "react-redux";
import type { Cart } from "../../modals/Cart";
import PaymentForm from "./PaymentForm";
import { useState } from "react";
import type { Customer } from "../../modals/Customer";




const CheckoutForm = ({ onPlaceOrder }: { onPlaceOrder: (customerData: Customer, paymentMethod: string) => void }) => {
    const [formData, setFormData] = useState<Customer>({
        email: "",
        phone: "",
        note: "",
        billingAdress: {    
            civility: "",
            firstName: "",
            lastName: "",
            zipCode: "",    
            street: "",
            companyName: "",
            country: "",
            city: "",
        },
        shippingAdress: {
            civility: "",
            firstName: "",
            lastName: "",
            zipCode: "",    
            street: "",
            companyName: "",
            country: "",
            city: "",
        }
    });

    const [paymentMethod, setPaymentMethod] = useState("credit_card");
    const [showShipping, setShowShipping] = useState(false);
    const cart = useSelector((state: { cart: Cart }) => state.cart);
    
    return (    
        <div className="checkout-form">
            <h2>Checkout Form</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                onPlaceOrder(formData, paymentMethod);
            }}>
            <div className="checkout-form__section">
                <h3>Billing Information</h3>
                
                <label>
                    Civility
                    <select value={formData.billingAdress.civility} onChange={(e) => setFormData({
                        ...formData,
                        billingAdress: {
                            ...formData.billingAdress,
                            civility: e.target.value
                        }
                    })} required>
                        <option value="mr">Mr.</option>
                        <option value="ms">Ms.</option>
                    </select>
                </label>
                <label>
                    First Name
                    <input type="text" placeholder="First Name" value={formData.billingAdress.firstName} onChange={(e) => setFormData({
                        ...formData,
                        billingAdress: {
                            ...formData.billingAdress,
                            firstName: e.target.value
                        }
                    })} required />
                </label>
                <label>
                    Last Name
                    <input type="text" placeholder="Last Name" value={formData.billingAdress.lastName} onChange={(e) => setFormData({
                        ...formData,
                        billingAdress: {
                            ...formData.billingAdress,
                            lastName: e.target.value
                        }
                    })} required />   
                </label>
                <label>
                    Company Name
                    <input type="text" placeholder="Company Name (optional)" value={formData.billingAdress.companyName} onChange={(e) => setFormData({
                        ...formData,
                        billingAdress: {
                            ...formData.billingAdress,
                            companyName: e.target.value
                        }
                    })} />
                </label>
                <label>
                    Street Address
                    <input type="text" placeholder="Street Address" value={formData.billingAdress.street} onChange={(e) => setFormData({
                        ...formData,
                        billingAdress: {
                            ...formData.billingAdress,
                            street: e.target.value
                        }
                    })} required />
                    
                </label>
                <label>
                    Town / City
                    <input type="text" placeholder="Town / City" value={formData.billingAdress.city} onChange={(e) => setFormData({
                        ...formData,
                        billingAdress: {
                            ...formData.billingAdress,
                            city: e.target.value
                        }
                    })} required />
                </label>
                <label>
                    State / County
                    <input type="text" placeholder="State / County" value={formData.billingAdress.country} onChange={(e) => setFormData({
                        ...formData,
                        billingAdress: {
                            ...formData.billingAdress,
                            country: e.target.value
                        }
                    })} required />
                </label>
                <label>
                    Postcode / ZIP
                    <input type="text" placeholder="Postcode / ZIP" value={formData.billingAdress.zipCode} onChange={(e) => setFormData({
                        ...formData,
                        billingAdress: {
                            ...formData.billingAdress,
                            zipCode: e.target.value
                        }
                    })} required />
                </label>
                <label>
                    Email Address
                    <input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({
                        ...formData,
                        email: e.target.value
                    })} required />
                   
                </label>
                <label>
                    Phone
                    <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({
                        ...formData,
                        phone: e.target.value
                    })} required />
                </label>
            </div>
            <div className="checkout-form__section">
                <h3>Ship to a different address?</h3>
                <label>
                    <input
                        type="checkbox"
                        checked={showShipping}
                        onChange={() => setShowShipping(!showShipping)}
                    />
                    Yes
                </label>
                {showShipping && (
                    <div className="checkout-form__shipping-fields">
                        <label>
                            Civility
                            <select value={formData.shippingAdress.civility} onChange={(e) => setFormData({
                                ...formData,
                                shippingAdress: {
                                    ...formData.shippingAdress,
                                    civility: e.target.value
                                }
                            })}>
                                <option value="mr">Mr.</option>
                                <option value="ms">Ms.</option>
                            </select>
                        </label>
                        <label>
                            First Name
                            <input type="text" placeholder="First Name" value={formData.shippingAdress.firstName} onChange={(e) => setFormData({
                                ...formData,
                                shippingAdress: {
                                    ...formData.shippingAdress,
                                    firstName: e.target.value
                                }
                            })} />
                        </label>
                        <label>
                            Last Name
                            <input type="text" placeholder="Last Name" value={formData.shippingAdress.lastName} onChange={(e) => setFormData({
                                ...formData,
                                shippingAdress: {
                                    ...formData.shippingAdress,
                                    lastName: e.target.value
                                }
                            })} />   
                        </label>
                        <label>
                            Company Name
                            <input type="text" placeholder="Company Name (optional)" value={formData.shippingAdress.companyName} onChange={(e) => setFormData({
                                ...formData,
                                shippingAdress: {
                                    ...formData.shippingAdress,
                                    companyName: e.target.value
                                }
                            })} />
                        </label>
                        <label>
                            Street Address
                            <input type="text" placeholder="Street Address" value={formData.shippingAdress.street} onChange={(e) => setFormData({
                                ...formData,
                                shippingAdress: {
                                    ...formData.shippingAdress,
                                    street: e.target.value
                                }
                            })} />
                        </label>
                        <label>
                            Town / City
                            <input type="text" placeholder="Town / City" value={formData.shippingAdress.city} onChange={(e) => setFormData({
                                ...formData,
                                shippingAdress: {
                                    ...formData.shippingAdress,
                                    city: e.target.value
                                }
                            })} />
                        </label>
                        <label>
                            State / County
                            <input type="text" placeholder="State / County" value={formData.shippingAdress.country} onChange={(e) => setFormData({
                                ...formData,
                                shippingAdress: {
                                    ...formData.shippingAdress,
                                    country: e.target.value
                                }
                            })} />
                        </label>
                        <label>
                            Postcode / ZIP
                            <input type="text" placeholder="Postcode / ZIP" value={formData.shippingAdress.zipCode} onChange={(e) => setFormData({
                                ...formData,
                                shippingAdress: {
                                    ...formData.shippingAdress,
                                    zipCode: e.target.value
                                }
                            })} />
                        </label>
                        
                    </div>
                
                )}
                <label>
                            Order Notes
                            <textarea placeholder="Notes about your order, e.g. special notes for delivery." value={formData.note} onChange={(e) => setFormData({
                                ...formData,
                                note: e.target.value
                            })}></textarea>
                        </label>
            </div>
            <div className="checkout-form__section">
                <h3>Payment Method</h3>
                <PaymentForm paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
            </div>
            <div className="checkout-form__section">
                <h3>Your Order</h3>
                <CartSummary cart={cart} />
            </div>
            
            <button type="submit" className="checkout-form__submit" disabled={cart.items.length === 0}>Place Order</button>
            </form>
        </div>
    )
}

export default CheckoutForm;