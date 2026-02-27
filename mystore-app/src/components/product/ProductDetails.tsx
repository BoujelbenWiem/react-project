import useFetch from "../hooks/useFetch";
import { getProductById } from "../../services/products.service";
import { useParams } from "react-router-dom";
import { Product } from "../../modals/Product";

const ProductDetails = () => {
    const { id } = useParams();
    const { data: product, loading, error } = useFetch<Product>(
        () => getProductById(id!)
        , [id]);
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div className="product-details">
            <div className="product-image">
                <img src={product.imageName} alt={product.name} />

            </div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
        </div>

    );
};

export default ProductDetails;