import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist);

  return (
    <div className="wishlist-page">

      {/* Wishlist Header */}
      <section className="wishlist-hero">

        <div>

          <h1>
            Wishlist
          </h1>

          <p>
            Products you've saved for later.
          </p>
        </div>

        <div className="wishlist-count-large">
          <strong>
            {wishlist.length.toString().padStart(2, "0")}
          </strong>

          <span>
            Saved
            <br />
            Styles
          </span>
        </div>

      </section>


      {/* Wishlist Products */}
      {wishlist.length > 0 ? (

        <section className="wishlist-products">

          <div className="wishlist-section-heading">

            <div>

              <h2>
                Pieces you love.
              </h2>

              <p>
                {wishlist.length}{" "}
                {wishlist.length === 1
                  ? "style"
                  : "styles"}{" "}
                saved in your wishlist.
              </p>
            </div>

            <Link
              to="/products"
              className="wishlist-shop-link"
            >
              Continue Shopping
            </Link>

          </div>


          <div className="product-grid">

            {wishlist.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

          </div>

        </section>

      ) : (

        /* Empty Wishlist */
        <section className="wishlist-empty">

          <div className="wishlist-empty-icon">
            ♡
          </div>

          <h2>
            Your wishlist is empty.
          </h2>

          <p>
            Explore our collection and save your
            favorite fashion pieces.
          </p>

          <Link
            to="/products"
            className="primary-button"
          >
            Explore Products
          </Link>

        </section>

      )}

    </div>
  );
}

export default Wishlist;