import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../features/wishlistSlice";

function ProductCard({ product, onDelete }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const user = JSON.parse(localStorage.getItem("user"));

  const isWishlisted = wishlist.some((item) => item.id === product.id);
  const rating = product.rating || 4.5;
  const price = Number(product.price || 0);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product));
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) onDelete(product.id);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <Link to={`/products/${product.id}`} aria-label={`View ${product.name}`}>
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
            loading="lazy"
            onError={(e) => {
              e.target.style.visibility = "hidden";
            }}
          />
        </Link>

        <button
          type="button"
          className={`wishlist-button ${isWishlisted ? "active" : ""}`}
          onClick={handleWishlist}
          aria-pressed={isWishlisted}
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        >
          {isWishlisted ? "♥" : "♡"}
        </button>
      </div>

      <div className="product-info">
        <div className="product-meta">
          <span className="product-category">{product.category || "Fashion"}</span>
          <span className="product-rating">★ {rating}</span>
        </div>

        <Link to={`/products/${product.id}`} className="product-name">
          {product.name}
        </Link>

        <p className="product-brand">{product.brand || "Nova Thread"}</p>

        <div className="product-bottom">
          <span className="product-price">₹{price.toLocaleString("en-IN")}</span>
        </div>

        {user && (
          <div className="product-admin-actions">
            <Link to={`/edit-product/${product.id}`} className="product-edit-button">
              Edit
            </Link>
            {onDelete && (
              <button type="button" onClick={handleDelete} className="product-delete-button">
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
