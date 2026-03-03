import visaImg from '../../assets/Visa.png';
import mastercardImg from '../../assets/Mastercard.png';
import paypalImg from '../../assets/Paypal.png';
const PaymentForm = ({ paymentMethod, setPaymentMethod }: { paymentMethod: string; setPaymentMethod: (method: string) => void }) => {
    //radio button for payment method
    
    return (
        <div className="payment-form">
            
            
                <label>
                    
                    <input type="radio" name="payment" value="credit-card" checked={paymentMethod === "credit-card"} onChange={() => setPaymentMethod("credit-card")} required />
                    Credit Card
                    <img src={visaImg} alt="Visa" style={{ width: '40px', marginRight: '8px' }} />
                    <img src={mastercardImg} alt="Mastercard" style={{ width: '40px', marginRight: '8px' }} />
                </label>
                <label>
                   
                    <input type="radio" name="payment" value="paypal" checked={paymentMethod === "paypal"} onChange={() => setPaymentMethod("paypal")} required />
                    PayPal
                     <img src={paypalImg} alt="PayPal" style={{ width: '40px', marginRight: '8px' }} />
                </label>
                <label>
                    <input type="radio" name="payment" value="bank-transfer" checked={paymentMethod === "bank-transfer"} onChange={() => setPaymentMethod("bank-transfer")} required />
                    Bank Transfer
                </label>
        </div>
    )
}

export default PaymentForm;
