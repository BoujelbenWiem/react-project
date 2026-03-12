import { useEffect } from "react";
import AppRouter from "./routes/AppRouter"
import { useAppDispatch } from "./redux/store";
import { fetchCart } from "./redux/slices/cartSlice";
import Notification from "./components/ui/Notification";
function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
  dispatch(fetchCart());
}, [dispatch]);
  return (
    <>
      <AppRouter />
      <Notification />
    </>
  )
}

export default App
