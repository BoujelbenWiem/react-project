import Carousel from "../components/carousel/Carousel";
import ProductList from "../components/product/ProductList";
import { getSlides } from "../services/slide.service";
import { getTopSellers, getNewProducts } from "../services/products.service";
import type { Slide } from "../modals/Slide";
import type { Product } from "../modals/Product";
import useFetch from "../components/hooks/useFetch";



const HomePage = () => {
    console.log("RENDERING HomePage");
    
    
    const {
        data: slides,
        loading: slidesLoading,
        error: slidesError  
    } =useFetch<Slide[]>(getSlides, []);
    const {
        data: topSellers,
        loading: topSellersLoading,
        error: topSellersError
    } = useFetch<Product[]>(getTopSellers, []);
    const { 
        data: newProducts,
        loading: newProductsLoading,
        error: newProductsError
    } = useFetch<Product[]>(getNewProducts, []);
        if (slidesError || topSellersError || newProductsError) {
        return <div className="error">Error loading data: {slidesError || topSellersError || newProductsError}</div>;
    }

    return (
        <div className="home-page">
            
            <Carousel slides={slides || []} loading={slidesLoading}/>
            <ProductList title="Top Sellers" products={topSellers || []} previewMode={true} loading={topSellersLoading}/>
            <ProductList title="New Products" products={newProducts || []} previewMode={true} loading={newProductsLoading}/>
        </div>
    )
}   

export default HomePage;