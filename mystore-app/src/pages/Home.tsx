import Carousel from "../components/carousel/Carousel";
import ProductList from "../components/product/ProductList";
import { getSlides } from "../services/slide.service";
import { getTopSellers, getNewProducts, getProductById } from "../services/products.service";
import type { Slide } from "../modals/Slide";
import type { Product } from "../modals/Product";
import useFetch from "../components/hooks/useFetch";
import ErrorMessage from "../components/ui/ErrorMessage";
import "./Home.scss";
import Cookies from "js-cookie";
import { useState } from "react";


const HomePage = () => {
    console.log("RENDERING HomePage");
    const getInitialRecentlyViewedIds = () => {
        const cookie = Cookies.get("recentlyViewed");
        if (cookie) {
            try {
                return JSON.parse(cookie);
            } catch {
                return [];
            }
        }
        return [];
    };
    const [recentlyViewedIds] = useState<string[]>(getInitialRecentlyViewedIds);

    const {
        data: recentlyViewedProducts,
        loading: recentlyViewedLoading,
        error: recentlyViewedError
    } = useFetch<Product[]>(() => {
        if (recentlyViewedIds.length === 0) return Promise.resolve([]);
        return Promise.all(recentlyViewedIds.map((id: string) => getProductById(id))).then(results => results.filter(p => p !== null) as Product[]);
    }, [recentlyViewedIds]);

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
    if (slidesError || topSellersError || newProductsError || recentlyViewedError) {
        return <ErrorMessage message={`Error loading data: ${slidesError || topSellersError || newProductsError || recentlyViewedError}`} onRetry={() => window.location.reload()} />;
    }

    


    return (
        <div className="home-page">
            <Carousel slides={slides || []} loading={slidesLoading}/>
            <ProductList title="Top Sellers" products={topSellers || []} previewMode={true} loading={topSellersLoading}/>
            <ProductList title="New Products" products={newProducts || []} previewMode={true} loading={newProductsLoading}/>
            {recentlyViewedIds.length > 0 && (
                <ProductList
                    title="Recently Viewed"
                    products={recentlyViewedProducts || []}
                    previewMode={true}
                    loading={recentlyViewedLoading}
                />
            )}
        </div>
    )
}   

export default HomePage;