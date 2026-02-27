import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const TunnelLayout  = () => {
    return (
        <div>
            
            <main className="container">
            <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}

export default TunnelLayout;
