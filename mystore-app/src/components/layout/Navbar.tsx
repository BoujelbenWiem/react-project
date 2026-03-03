import './Navbar.scss';
import { Link } from 'react-router-dom';
import { getCategories } from "../../services/categories.service";
import useFetch from "../hooks/useFetch";
import ErrorMessage from "../ui/ErrorMessage";
import Loader from "../ui/Loader";

const Navbar: React.FC = () => {
  const { data: categories, loading, error } = useFetch(getCategories, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message="Error loading categories" />;
  if (!categories) return <ErrorMessage message="No categories found" />;

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        {categories.map((category) => (
          <li key={category.id}>
            <Link to={`/shop?categoryId=${category.id}`}>
              {category.name}
            </Link>
          </li>

        ))}

        

      </ul>
    </nav>
  );
};

export default Navbar;