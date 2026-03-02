import { useAppDispatch } from "../../redux/store";
import { confirmOrder } from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
export const OrderConfirmation = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handlePlaceOrder = async () => {
        await dispatch(confirmOrder({
            customer: formData,
            paymentMethod
        }))
        navigate('/order-confirmation');
    }
    return (
        <>
        <button onClick={handlePlaceOrder}>Place Order</button>
        
        </>
    )
}

export default OrderConfirmation;