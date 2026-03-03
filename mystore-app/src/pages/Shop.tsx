import "./Shop.scss";
import ProductList from "../components/product/ProductList";
import type { Product } from "../modals/Product";
import { useSearchParams} from "react-router-dom";
import { getProducts } from "../services/products.service";
import Pagination from "../components/ui/Pagination";
import useFetch from "../components/hooks/useFetch";
import ErrorMessage from "../components/ui/ErrorMessage";

import SearchBar from "../components/layout/SearchBar";


const ShopPage = () => {
    console.log("RENDERING ShopPage");
    const limit = 8;
    const [searchParams,setSearchParams] = useSearchParams();

    const categoryId = searchParams.get("categoryId");
    const pageParam = Number(searchParams.get("page")) || 1;
    const sortParam = searchParams.get("sort") || "";
    const orderParam = searchParams.get("order") || "";
    const searchQuery = searchParams.get("q") || "";
    const typeParam = searchParams.get("type") || "";
    
    console.log("PAGE PARAM :", pageParam);
    console.log("SORT PARAM :", sortParam);
    console.log("ORDER PARAM :", orderParam);
    console.log("SEARCH QUERY :", searchQuery);
   
   
    //console.log("CATEGORY ID :", categoryId);

   const {data, loading, error}=useFetch<{data: Product[]; total: number}>(
        () =>
            getProducts({
                ...(categoryId && { categoryId }),
                _page: pageParam,
                _limit: limit,
                ...(sortParam && orderParam && { _sort: sortParam, _order: orderParam }),
                ...(searchQuery && { q: searchQuery }),
                ...(typeParam && { type: typeParam })
            })
        , [categoryId, pageParam, sortParam, orderParam, searchQuery, typeParam]);

    const products=data?.data || [];
    const total=data?.total || 0;
    const totalPages = Math.ceil(total / limit);

         
    
    if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;
    const handlePageChange = (newPage: number) => {
  const params = new URLSearchParams(searchParams);
  params.set("page", newPage.toString());
  setSearchParams(params);
};

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams);
        if(!e.target.value){
            params.delete("sort");
            params.delete("order");
        } else {
            params.set("sort", "price");
            params.set("order", e.target.value);
        }
        setSearchParams(params);
    }

    const handleCategorySearch = (searchTerm: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("q", searchTerm);
        params.set("page", "1");
        if(categoryId){
            params.set("categoryId", categoryId);
        }
        setSearchParams(params);
    }
    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams);
        if(!e.target.value){
            params.delete("type");
        } else {
            params.set("type", e.target.value);
        }
        setSearchParams(params);
    }
    return (
        <div className="shop-page">
            <div className="shop-header">
                <h2 className="shop-title">Shop</h2>
                <div className="shop-controls">
                    <select className="sort-select" value={orderParam} onChange={handleSortChange}>
                        <option value="">Sort by price</option>
                        <option value="asc">Price Low &#8594; High</option>
                        <option value="desc">Price High &#8594; Low</option>
                    </select>
                </div>
               
            </div>
            {!categoryId && <div className="shop-controls">
                <select className="type-select" value={typeParam} onChange={handleTypeChange}>
                    <option value="">All Types</option>
                    <option value="tablet">Tablets</option>
                    <option value="phone">Smartphones</option>
                    <option value="watch">Watches</option>

                </select>
            </div>}
 <div className="shop-search">
                    {categoryId && <SearchBar value={searchQuery} onChange={(value) => handleCategorySearch(value)} onSearch={() => handleCategorySearch(searchQuery)} />}
                </div>

            <ProductList title="" products={products} loading={loading}/>
            <Pagination currentPage={pageParam} totalPages={totalPages} onPageChange={handlePageChange}/>
        </div>
    )
}

export default ShopPage;