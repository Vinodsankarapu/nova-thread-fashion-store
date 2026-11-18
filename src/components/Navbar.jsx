import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const wishlist = useSelector((state) => state.wishlist);
  const cart = useSelector((state) => state.cart || []);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <nav className="fashion-navbar" aria-label="Main">
      <div className="fashion-logo">
        <Link to="/" aria-label="Nova Thread home">
          <span className="brand-symbol" aria-hidden="true"></span>
          <span className="brand-name">Nova Thread</span>
        </Link>
      </div>

      <div className="fashion-nav-links">
        <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
          Home
        </Link>

        <Link to="/products" className={`nav-link ${isActive("/products") ? "active" : ""}`}>
          Shop
        </Link>

        <Link to="/wishlist" className={`nav-link wishlist-link ${isActive("/wishlist") ? "active" : ""}`}>
          Wishlist
          <span className="wishlist-count">{wishlist.length}</span>
        </Link>

        <Link to="/cart" className={`nav-link cart-link ${isActive("/cart") ? "active" : ""}`}>
          Bag
          <span className="cart-count">{cartCount}</span>
        </Link>

        {user ? (
          <>
            <span className="nav-user">{user.name}</span>
            <Link to="/logout" className="nav-button logout-button">
              Log out
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-button login-button">
              Log in
            </Link>
            <Link to="/signup" className="nav-button signup-button">
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
