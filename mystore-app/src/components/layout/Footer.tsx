import { Link } from "react-router-dom";
import "./Footer.scss";
import type { Category } from "../../modals/Category";
import { getCategories } from "../../services/categories.service";
import useFetch from "../hooks/useFetch";
import Loader from "../ui/Loader";
const Footer = () => {

  const { data: categories, loading, error } = useFetch<Category[]>(getCategories, []);
  
  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <footer className="footer">
      <div className="footer__container container">

        <div className="footer__column">
          <h3 className="footer__title">PhoneZone</h3>
          <p className="footer__text">
            PhoneZone is your trusted online shop for the latest tech products.
            Discover top brands, great prices, and fast delivery.
          </p>
        </div>

        <div className="footer__column">
          <h3 className="footer__title">Categories</h3>
          <ul className="footer__links">
            {categories?.length ? (
              categories.map((category) => (
                <li key={category.id}>
                  <Link to={`/shop?categoryId=${category.id}`}>{category.name}</Link>
                </li>
              ))
            ) : (
              <li>No categories available</li>
            )}
          </ul>
        </div>

        <div className="footer__column">
          <h3 className="footer__title">Newsletter</h3>
          <p className="footer__text">
            Subscribe to get updates on new products and special offers.
          </p>

          <div className="footer__newsletter">
            <input
              type="email"
              placeholder="Enter your email"
            />
            <button >Sign Up</button>
          </div>
        </div>

      </div>

      <div className="footer__bottom">
        © {new Date().getFullYear()} PhoneZone. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;