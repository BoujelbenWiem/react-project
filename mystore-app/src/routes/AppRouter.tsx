import { BrowserRouter , Routes, Route } from "react-router-dom";

import HomePage from "../pages/Home";
import NavLayout from "../components/layout/NavLayout";
import TunnelLayout from "../components/layout/TunnelLayout";
import CartPage from "../pages/Cart";
import ShopPage from "../pages/Shop";
import ProductDetailsPage from "../pages/ProductDetails";
import CheckoutPage from "../pages/Checkout";




const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NavLayout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="shop" element={<ShopPage/>}/>
                    <Route path="products/:id" element={<ProductDetailsPage/>}/>
                </Route>
                <Route path="/cart" element={<TunnelLayout/>}>
                    <Route index element={<CartPage/>}/>
                    <Route path="checkout" element={<CheckoutPage/>}/>

                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;