import { Link } from "react-router-dom";
import "./Footer.scss";
import type { Category } from "../../modals/Category";
import { getCategories } from "../../services/categories.service";
import { useEffect, useState } from "react";


const Footer = () => {
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
            {categories.map((category) => (
              <li key={category.id}>
                <Link to={`/shop?categoryId=${category.id}`}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </div>


        <div className="footer__column">
          <h3 className="footer__title">Newsletter</h3>
          <p className="footer__text">
            Subscribe to get updates on new products and special offers.
          </p>

          <form className="footer__newsletter">
            <input
              type="email"
              placeholder="Enter your email"
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>

      </div>

      <div className="footer__bottom">
        © {new Date().getFullYear()} PhoneZone. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;