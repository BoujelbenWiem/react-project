import './Navbar.scss';
import { Link } from 'react-router-dom';
import type { Category } from "../../modals/Category";
import { getCategories } from "../../services/categories.service";
import { useEffect,useState } from "react";
const Navbar: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
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