import { Link } from "react-router-dom";
// import { FaFacebook } from "react-icons/fa";
// import { FaInstagram } from "react-icons/fa";
// import { FaYoutube } from "react-icons/fa";
// import { FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-white mt-4 md:mt-20">
      <div className="mx-auto px-4 py-12 sm:px-8 lg:px-10 xl:px-15">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/">
              <span className="text-2xl font-primary-bold italic tracking-tight">
                RB EYEWEAR
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
              Modern eyewear designed for everyday style.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-text">
              Shop
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li>
                <Link to="/" className="transition hover:text-text">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/" className="transition hover:text-text">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="transition hover:text-text">
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-text">
              Customer
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li>
                <Link to="/orders" className="transition hover:text-text">
                  My Orders
                </Link>
              </li>
              <li>
                <Link to="/login" className="transition hover:text-text">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="transition hover:text-text">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-text">
              Follow Us
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li>
                <a href="#" className="transition hover:text-text">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-text">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-text">
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} RB STORE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
