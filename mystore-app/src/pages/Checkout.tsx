import CheckoutForm from "../components/checkout/CheckoutForm";
import { confirmOrder } from "../redux/slices/cartSlice";
import { useAppDispatch } from "../redux/store";
import type { Customer } from "../modals/Customer";
import { useNavigate } from "react-router-dom";

const CheckoutPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

   const handlePlaceOrder = async (customerData: Customer, paymentMethod: string) => {
  
      await dispatch(confirmOrder({ customer: customerData, paymentMethod }));
      navigate("/")
   
  };

  return (
    <div className="checkout-page">
        
        <CheckoutForm onPlaceOrder={handlePlaceOrder}  />

    </div>
  );
}

export default CheckoutPage;