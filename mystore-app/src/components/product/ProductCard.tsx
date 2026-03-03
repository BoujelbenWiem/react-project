import type { Product } from "../../modals/Product";
import { useNavigate } from "react-router-dom";
import "./ProductCard.scss";
import { useAppDispatch } from "../../redux/store";
import { cartActions, syncCart } from "../../redux/slices/cartSlice";
import { uiActions } from "../../redux/slices/uiSlice";


const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  console.log("RENDERING ProductCard");
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card click event
        dispatch(cartActions.addItemToCart({ product, quantity: 1 }));
        dispatch(syncCart());
        dispatch(uiActions.showNotification({
          status: "success",
          title: "Item Added",
          message: 'Item added to cart. <a href="/cart">Go to cart</a>'
        }));
    }
    const discountedPrice = (product.price * (1 - product.discountRate / 100)).toFixed(2);
    const handleNavigate = () => {
        navigate(`/products/${product.id}`);
    }
    return (
        <div className="product-card" onClick={handleNavigate}>
      
      {product.discountRate > 0 && (
        <span className="discount-badge">
          -{product.discountRate}%
        </span>
      )}

      <div className="product-image">
          <img
            src={`/images/products/${product.categoryName}/${product.imageName}`}
            alt={product.name}
            
          />
</div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>

        <div className="product-reviews">
          {"★".repeat(product.review)}
          {"☆".repeat(5 - product.review)}
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

        <button
          className="add-to-cart-btn"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </div>
    </div>
    );
}

export default ProductCard;
