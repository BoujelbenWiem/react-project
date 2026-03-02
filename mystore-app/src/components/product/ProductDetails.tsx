import useFetch from "../hooks/useFetch";
import { getProductById } from "../../services/products.service";
import { getCategories } from "../../services/categories.service";
import { useParams, useNavigate } from "react-router-dom";
import type { Product } from "../../modals/Product";
import type { Category } from "../../modals/Category";
import Loader from "../ui/Loader";
import "./ProductDetails.scss";
import { cartActions } from "../../redux/slices/cartSlice";
import { syncCart } from "../../redux/slices/cartSlice";
import { useState } from "react";
import { useAppDispatch } from "../../redux/store";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch(); 
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: product,
    loading: loadingProduct,
    error: errorProduct,
  } = useFetch<Product>(() => getProductById(id!), [id]);

  const {
    data: categories,
    loading: loadingCategories,
    error: errorCategories,
  } = useFetch<Category[]>(getCategories, []);

  if (loadingProduct || loadingCategories) return <Loader />;
  if (errorProduct) return <div>Error: {errorProduct}</div>;
  if (errorCategories) return <div>Error: {errorCategories}</div>;
  if (!product) return <div>Product not found</div>;

  const imageUrl = `/images/products/${product.categoryName}/${product.imageName}`;
  const discountedPrice = (
    product.price *
    (1 - product.discountRate / 100)
  ).toFixed(2);

 const handleAddToCart = () => {
  dispatch(cartActions.addItemToCart({ product, quantity: quantity }));
  dispatch(syncCart());
};

  return (
    <div className="product-details-page">
      {/* Breadcrumb */}
      
      <div className="breadcrumb">
        <span onClick={() => navigate("/")}>Home</span>
        <span className="separator">/</span>
        <span
          onClick={() =>
            navigate(`/shop?categoryId=${product.categoryId}`)
          }
        >
          {product.categoryName}
        </span>
        <span className="separator">/</span>
        <span className="current">{product.name}</span>
      </div>

      {/* Main Section */}
      <div className="product-main">
        {/* LEFT - IMAGE */}
        <div className="product-image">
          <img src={imageUrl} alt={product.name} />
        </div>

        {/* RIGHT - INFO */}
        <div className="product-info">
          <h1>{product.name}</h1>

          <div className="product-reviews">
            {"★".repeat(product.review || 0)}
            {"☆".repeat(5 - (product.review || 0))}
          </div>

          <div className="product-prices">
            <span className="discounted-price">
              {discountedPrice} TND
            </span>

            {product.discountRate > 0 && (
              <span className="original-price">
                {product.price} TND
              </span>
            )}
          </div>

          <p className="product-description">
            {product.description}
          </p>

          <div className="purchase-section">
            <form >
                <input

              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="quantity-input"
            />
                <button type="button" className="add-btn" onClick={handleAddToCart}>
                    Add to cart
                </button>
            </form>
            

            
          </div>
          
        </div>
      </div>

      {/* Other Brands */}
      <div className="other-brands-section">
        <h2>Other Brands</h2>

        <div className="other-brands">
          {categories
            ?.filter((c) => c.id !== product.categoryId)
            .slice(0, 4)
            .map((category) => (
              <div
                key={category.id}
                className="brand-card"
                onClick={() =>
                  navigate(`/shop?categoryId=${category.id}`)
                }
              >
                {category.name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;