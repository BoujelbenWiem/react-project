import Header from "./Header";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const NavLayout  = () => {
    return (
        <div>
            <Header/>
            <Navbar/>
            <main className="container">
            <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}

export default NavLayout;
