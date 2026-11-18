import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart
} from "../features/cartSlice";

function Cart() {
  const dispatch = useDispatch();

  const cart = useSelector(
    (state) => state.cart || []
  );

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );

  /* ================================
     Empty cart
  ================================= */

  if (cart.length === 0) {
    return (
      <div className="cart-page">

        <section className="cart-empty">

          <div className="cart-empty-icon">
            
          </div>

          <h1>
            Your cart is empty.
          </h1>

          <p>
            Looks like you haven't added anything
            to your cart yet.
          </p>

          <Link
            to="/products"
            className="primary-button"
          >
            Explore Products
          </Link>

        </section>

      </div>
    );
  }

  return (
    <div className="cart-page">

      {/* =====================================
          Cart header
      ====================================== */}

      <section className="cart-header">

        <div>

          <h1>
            My Cart
          </h1>

          <p>
            {totalItems}{" "}
            {totalItems === 1
              ? "item"
              : "items"}{" "}
            selected for you.
          </p>

        </div>

        <div className="cart-header-count">

          <strong>
            {String(totalItems).padStart(2, "0")}
          </strong>

          <span>
            Items
          </span>

        </div>

      </section>


      {/* =====================================
          Cart content
      ====================================== */}

      <section className="cart-content">

        {/* PRODUCTS */}

        <div className="cart-items">

          {cart.map((item) => (

            <div
              className="cart-item"
              key={item.id}
            >

              {/* IMAGE */}

              <Link
                to={`/products/${item.id}`}
                className="cart-item-image"
              >

                <img
                  src={item.image}
                  alt={item.name}
                />

              </Link>


              {/* PRODUCT INFORMATION */}

              <div className="cart-item-info">

                <span className="cart-item-category">
                  {item.category}
                </span>

                <Link
                  to={`/products/${item.id}`}
                  className="cart-item-name"
                >
                  {item.name}
                </Link>

                <p className="cart-item-brand">
                  {item.brand}
                </p>

                <p className="cart-item-price">
                  ₹
                  {Number(
                    item.price
                  ).toLocaleString("en-IN")}
                </p>

              </div>


              {/* QUANTITY */}

              <div className="cart-item-quantity">

                <span>
                  Quantity
                </span>

                <div className="quantity-controls">

                  <button
                    type="button"
                    onClick={() =>
                      dispatch(
                        decreaseQuantity(item.id)
                      )
                    }
                  >
                    −
                  </button>

                  <strong>
                    {item.quantity}
                  </strong>

                  <button
                    type="button"
                    onClick={() =>
                      dispatch(
                        increaseQuantity(item.id)
                      )
                    }
                  >
                    +
                  </button>

                </div>

              </div>


              {/* ITEM TOTAL */}

              <div className="cart-item-total">

                ₹
                {(
                  Number(item.price) *
                  item.quantity
                ).toLocaleString("en-IN")}

              </div>


              {/* REMOVE */}

              <button
                type="button"
                className="cart-remove"
                onClick={() =>
                  dispatch(
                    removeFromCart(item.id)
                  )
                }
                title="Remove item"
              >
                ×
              </button>

            </div>

          ))}


          {/* CLEAR CART */}

          <button
            type="button"
            className="cart-clear"
            onClick={() =>
              dispatch(clearCart())
            }
          >
            Clear Cart
          </button>

        </div>


        {/* =====================================
            Order summary
        ====================================== */}

        <aside className="cart-summary">

          <h2>
            Your Selection
          </h2>


          <div className="summary-row">

            <span>
              Items
            </span>

            <span>
              {totalItems}
            </span>

          </div>


          <div className="summary-row">

            <span>
              Subtotal
            </span>

            <span>
              ₹
              {subtotal.toLocaleString("en-IN")}
            </span>

          </div>


          <div className="summary-row">

            <span>
              Delivery
            </span>

            <span>
              Free
            </span>

          </div>


          <div className="summary-divider"></div>


          <div className="summary-total">

            <span>
              Total
            </span>

            <strong>
              ₹
              {subtotal.toLocaleString("en-IN")}
            </strong>

          </div>


          {/* CHECKOUT */}

          <button
            type="button"
            className="cart-checkout"
            onClick={() =>
              alert(
                "Checkout feature coming soon!"
              )
            }
          >
            Proceed to Checkout
          </button>


          <Link
            to="/products"
            className="cart-continue"
          >
            Continue Shopping
          </Link>

        </aside>

      </section>

    </div>
  );
}

export default Cart;