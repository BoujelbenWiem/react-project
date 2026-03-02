import { useEffect } from "react";
import AppRouter from "./routes/AppRouter"
import { useAppDispatch } from "./redux/store";
import { fetchCart } from "./redux/slices/cartSlice";
function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
  dispatch(fetchCart());
}, []);
  return (
    <>
      <AppRouter />
    </>
  )
}

export default App
