import ProductCard from "./ProductCard";
import "./ProductList.scss";
import type { Product } from "../../modals/Product";
import { useState ,useMemo} from "react";
import Loader from "../ui/Loader";

const ProductList: React.FC<{ products: Product[]; maxDisplay?: number; title: string; previewMode?: boolean; loading?: boolean }> = ({ products, maxDisplay = 3, title = "", previewMode = false, loading = false }) => {
  //console.log("RENDERING ProductList");
  const [showAll, setShowAll] = useState(false);
  const displayedProducts = useMemo(() => {
      if (!previewMode) return products;
    return showAll
      ? products
      : products.slice(0, maxDisplay);
    }, [showAll, products, maxDisplay, previewMode]);
    const toggleView = () => {
        setShowAll((prev) => !prev);
    }
    //console.log(products.length, maxDisplay);
    return (
        <section className="product-list">
      <h2 className="product-list-title">{title}</h2>
      {previewMode && products.length > maxDisplay &&  (
        <button
          className="view-toggle" onClick={toggleView}
        >
          {showAll ? "View Less" : "View All"}
        </button>
      )}
    <div className="product-grid-wrapper" >
      {loading ? (
        <Loader />
      ) : (
      <div className="product-grid">
        {displayedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
      )}
    </div>
    </section>
    );
}
export default ProductList;
