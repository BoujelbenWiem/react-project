import CartSummary from "../cart/CartSummary"
import './CheckoutForm.scss';
import { useSelector } from "react-redux";
import type { Cart } from "../../modals/Cart";
import PaymentForm from "./PaymentForm";
import { useState } from "react";
import type { Customer } from "../../modals/Customer";
import type { Address } from "../../modals/Customer";
import AddressForm from "./AdressForm";

const CheckoutForm = ({ onPlaceOrder }: { onPlaceOrder: (customerData: Customer, paymentMethod: string) => void }) => {
    const [errors, setErrors] = useState<Record<string, string>>({});
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
    const [showShippingAddress, setShowShippingAddress] = useState(true); // Renommé pour plus de clarté
    const cart = useSelector((state: { cart: Cart }) => state.cart);

    const updateBilling = (field: keyof Address, value: string) => {
        setFormData((prev) => ({
            ...prev,
            billingAdress: {
                ...prev.billingAdress,
                [field]: value
            }
        }));
    };

    const updateShipping = (field: keyof Address, value: string) => {
        setFormData((prev) => ({
            ...prev,
            shippingAdress: {
                ...prev.shippingAdress,
                [field]: value
            }
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        const finalData = {
            ...formData,
            shippingAdress: showShippingAddress
                ? formData.billingAdress
                : formData.shippingAdress
        };

        onPlaceOrder(finalData, paymentMethod);
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.phone) {
            newErrors.phone = "Phone is required";
        } else if (!/^[0-9]{8,15}$/.test(formData.phone)) {
            newErrors.phone = "Invalid phone number";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (    
        <div className="checkout-form">
            <h2>Checkout</h2>

            <form onSubmit={handleSubmit}>
                    <div className="checkout-form__main">
                        <div className="checkout-form__section">
                        <h3>Contact Information</h3>
                        
                        <label>
                            Email Address
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                                }
                                required
                                placeholder="your@email.com"
                            />
                        </label>

                        <label>
                            Phone Number
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                                }
                                required
                                placeholder="+216 XX XXX XXX"
                            />
                            {errors.phone && <p className="error">{errors.phone}</p>}
                        </label>
                    </div>

                    <AddressForm
                        title="Billing Address"
                        address={formData.billingAdress}
                        required
                        onChange={updateBilling}
                    />

                    <div className="checkout-form__section">
                        <h3>Shipping Address</h3>
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={!showShippingAddress}
                                onChange={() => setShowShippingAddress(!showShippingAddress)}
                            />
                            Add a different shipping address
                        </label>

                        {!showShippingAddress && (
                            <AddressForm
                                title="Different Shipping Address"
                                address={formData.shippingAdress}
                                onChange={updateShipping}
                            />
                        )}
                    </div>

                    <div className="checkout-form__section">
                        <h3>Order Notes (Optional)</h3>
                        <label>
                            <textarea
                                value={formData.note}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, note: e.target.value }))
                                }
                                placeholder="Special instructions for delivery, gift notes, etc."
                                rows={4}
                            />
                        </label>
                    </div>
                </div>

                <div className="checkout-form__sidebar">
                    <div className="checkout-form__section sticky">
                        <h3>Your Order</h3>
                        <CartSummary cart={cart} />
                    </div>

                    <div className="checkout-form__section">
                        <h3>Payment Method</h3>
                        <PaymentForm
                            paymentMethod={paymentMethod}
                            setPaymentMethod={setPaymentMethod}
                        />
                    </div>

                    <button
                        type="submit"
                        className="checkout-form__submit"
                        disabled={cart.items.length === 0}
                    >
                        Place Order
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CheckoutForm;