import Cookies from "js-cookie";
import {  useState } from "react";
import ProductList from "./ProductList";
import useFetch from "../hooks/useFetch";
import { getProductById } from "../../services/products.service";
import type { Product } from "../../modals/Product";
//this c
const RecentlyViewed : React.FC  = () => {
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
        
    } = useFetch<Product[]>(() => {
        if (recentlyViewedIds.length === 0) return Promise.resolve([]);
        return Promise.all(recentlyViewedIds.map((id: string) => getProductById(id)));
    }, [recentlyViewedIds]); //promise

    return (
        <>
        {recentlyViewedIds.length > 0 && (
                <ProductList
                    title="Recently Viewed"
                    products={recentlyViewedProducts || []}
                    previewMode={true}
                    loading={recentlyViewedLoading}
                />
            )}
        </>
    );

}
export default RecentlyViewed;