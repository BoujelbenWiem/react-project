
const PaymentForm = () => {
    //radio button for payment method
    return (
        <div className="payment-form">
            <h2>Payment Method</h2>
            <label>
                <input type="radio" name="payment" value="credit-card" />
                Credit Card
            </label>
            <label>
                <input type="radio" name="payment" value="paypal" />
                PayPal
            </label>
            <label>
                <input type="radio" name="payment" value="bank-transfer" />
                Bank Transfer
            </label>
        </div>
    )
}

export default PaymentForm;
