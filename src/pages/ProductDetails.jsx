import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../services/api";

import {
  addToWishlist,
  removeFromWishlist
} from "../features/wishlistSlice";

import {
  addToCart
} from "../features/cartSlice";

function ProductDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const wishlist = useSelector(
    (state) => state.wishlist
  );

  const cart = useSelector(
    (state) => state.cart || []
  );

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        `/products/${id}`
      );

      setProduct(response.data);
    } catch (error) {
      console.error(
        "Error fetching product:",
        error
      );

      setProduct(null);
      setError(
        "Unable to load this product. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================================
     Loading
  ================================= */

  if (loading) {
    return (
      <div className="details-loading">

        <div className="loading-circle"></div>

        <p>
          Loading…
        </p>

      </div>
    );
  }

  /* ================================
     Product not found / error
  ================================= */

  if (!product) {
    return (
      <div className="details-not-found">

        <h1>
          Product not found.
        </h1>

        <p>
          {error ||
            "The product you are looking for does not exist."}
        </p>

        <Link
          to="/products"
          className="primary-button"
        >
          Back to Shop
        </Link>

      </div>
    );
  }

  /* ================================
     Wishlist
  ================================= */

  const isWishlisted = wishlist.some(
    (item) => item.id === product.id
  );

  const handleWishlist = () => {
    if (isWishlisted) {
      dispatch(
        removeFromWishlist(product.id)
      );
    } else {
      dispatch(
        addToWishlist(product)
      );
    }
  };

  /* ================================
     Cart
  ================================= */

  const cartItem = cart.find(
    (item) => item.id === product.id
  );

  const handleAddToCart = () => {
    dispatch(addToCart(product));

    alert(
      `${product.name} added to cart!`
    );
  };

  /* ================================
     Rating
  ================================= */

  const rating = product.rating || 4.5;

  /* ================================
     Product details
  ================================= */

  return (
    <div className="product-details-page">

      {/* =====================================
          Breadcrumb
      ====================================== */}

      <div className="details-breadcrumb">

        <Link to="/">
          Home
        </Link>

        <span>
          /
        </span>

        <Link to="/products">
          Shop
        </Link>

        <span>
          /
        </span>

        <Link
          to={`/products?category=${product.category}`}
        >
          {product.category}
        </Link>

        <span>
          /
        </span>

        <span>
          {product.name}
        </span>

      </div>


      {/* =====================================
          Main product
      ====================================== */}

      <section className="details-main">

        {/* IMAGE */}

        <div className="details-image-wrapper">

          <img
            src={product.image}
            alt={product.name}
            className="details-main-image"
          />

        </div>


        {/* INFORMATION */}

        <div className="details-content">

          {/* CATEGORY */}

          <Link
            to={`/products?category=${product.category}`}
            className="details-category"
          >
            {product.category}
          </Link>


          {/* NAME */}

          <h1>
            {product.name}
          </h1>


          {/* BRAND */}

          <p className="details-brand">
            {product.brand}
          </p>


          {/* RATING */}

          <div className="details-rating">

            <span>
              ★ {rating}
            </span>

          </div>


          {/* PRICE */}

          <div className="details-price">
            ₹
            {Number(
              product.price
            ).toLocaleString("en-IN")}
          </div>


          {/* DESCRIPTION */}

          <p className="details-description">
            {product.description}
          </p>


          {/* PRODUCT INFORMATION */}

          <div className="details-info">

            <div>
              <span>
                Size
              </span>

              <p>
                {product.size || "Not specified"}
              </p>
            </div>


            <div>
              <span>
                Color
              </span>

              <p>
                {product.color || "Not specified"}
              </p>
            </div>


            <div>
              <span>
                Material
              </span>

              <p>
                {product.material || "Not specified"}
              </p>
            </div>


            <div>
              <span>
                Brand
              </span>

              <p>
                {product.brand}
              </p>
            </div>


            <div>
              <span>
                Category
              </span>

              <p>
                {product.category}
              </p>
            </div>


            <div>
              <span>
                Budget
              </span>

              <p>
                {product.budget}
              </p>
            </div>

          </div>


          {/* ACTIONS */}

          <div className="details-actions">

            {/* ADD TO CART */}

            <button
              onClick={handleAddToCart}
              className="details-cart-button"
            >
              
              {cartItem
                ? ` Add More to Cart (${cartItem.quantity})`
                : " Add to Cart"}
            </button>


            {/* WISHLIST */}

            <button
              onClick={handleWishlist}
              className={
                isWishlisted
                  ? "details-wishlist active"
                  : "details-wishlist"
              }
            >
              {isWishlisted
                ? "♥  Remove from Wishlist"
                : "♡  Add to Wishlist"}
            </button>


            {/* BACK */}

            <Link
              to="/products"
              className="details-back"
            >
              Back to Shop
            </Link>

          </div>


          {/* EXTRA INFORMATION */}

          <div className="details-note">

            <div>

              <strong>
                Nova Thread
              </strong>

              <span>
                Curated fashion for everyday confidence.
              </span>

            </div>


            <div>

              <strong>
                Quality
              </strong>

              <span>
                Carefully selected pieces and materials.
              </span>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default ProductDetails;