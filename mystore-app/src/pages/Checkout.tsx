import CheckoutForm from "../components/checkout/CheckoutForm";
import { confirmOrder } from "../store/slices/cartSlice";
import { useAppDispatch } from "../store";
import { useNavigate } from "react-router-dom";
const CheckoutPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handlePlaceOrder = async () => {
  await dispatch(
    confirmOrder({
      customer: formData,
      paymentMethod
    })
  );

  navigate("/order-success");
};


  return (
    <div className="checkout-page">
        <h1>Checkout</h1>
        <CheckoutForm onPlaceOrder={handlePlaceOrder}  />
    </div>
  );
}

export default CheckoutPage;