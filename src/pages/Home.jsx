import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

const CATEGORIES = ["Dresses", "Shirts", "Jeans", "Jackets", "Shoes", "Trousers"];

const FABRICS = [
  { name: "Cotton", note: "Poplin, oxford, voile", color: "#9dbbe0" },
  { name: "Linen", note: "Cool and crinkled", color: "#d9d2bd" },
  { name: "Khadi", note: "Handspun, textured", color: "#d6c9ad" },
  { name: "Denim", note: "Rinse to raw selvedge", color: "#2c3f7d" },
  { name: "Wool blend", note: "For tailored trousers", color: "#4a4f5c" }
];

const formatPrice = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get("/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const topRated = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const newIn = products.slice(-4).reverse();

  const heroTiles = [9, 1, 14]
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  const jeans = products.filter((p) => p.category === "Jeans");
  const jeansFrom = jeans.length ? Math.min(...jeans.map((p) => Number(p.price))) : null;

  return (
    <div className="home-page">
      {/* HERO */}
      <section className="hero-section">
        <div className="hero-inner">
          <div className="hero-content">
            <h1>
              Clothes made
              <br />
              to be worn in.
            </h1>

            <p className="hero-description">
              Everyday dresses, shirts, denim and shoes in cotton, linen and khadi. Cut simply,
              priced fairly, and built to get better with every wash.
            </p>

            <div className="hero-buttons">
              <Link to="/products" className="primary-button">
                Shop all {products.length || ""} pieces
              </Link>
              <Link to="/products?category=Jeans" className="secondary-button">
                See the denim
              </Link>
            </div>
          </div>

          <div className="hero-image-wrapper">
            {heroTiles.map((p, i) => (
              <figure key={p.id} className={`hero-tile t${i + 1}`}>
                <Link to={`/products/${p.id}`}>
                  <img src={p.image} alt={p.name} />
                </Link>
                <figcaption>
                  <span>{p.name}</span>
                  <strong>{formatPrice(p.price)}</strong>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FABRICS */}
      <section className="fabric-section">
        <div className="fabric-row">
          {FABRICS.map((f) => (
            <div className="fabric" key={f.name}>
              <div className="fabric-swatch" style={{ backgroundColor: f.color }} aria-hidden="true"></div>
              <div>
                <strong>{f.name}</strong>
                <span>{f.note}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="category-section">
        <div className="section-heading">
          <h2>Shop by category</h2>
          <Link to="/products" className="section-link">
            View everything
          </Link>
        </div>

        <div className="category-grid">
          {CATEGORIES.map((name) => {
            const items = products.filter((p) => p.category === name);
            const cover = items[0];

            return (
              <Link key={name} to={`/products?category=${name}`} className="category-card">
                {cover && <img src={cover.image} alt="" />}
                <div className="category-overlay">
                  <h3>{name}</h3>
                  <span>{items.length}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* TOP RATED */}
      <section className="products-section">
        <div className="section-heading">
          <h2>Best rated</h2>
          <Link to="/products?sort=high" className="section-link">
            Shop all
          </Link>
        </div>

        <div className="home-product-grid">
          {topRated.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* EDITORIAL */}
      {jeans.length > 0 && (
        <section className="editorial-section">
          <div className="editorial-inner">
            <div className="editorial-content">
              <h2>Indigo, in {jeans.length} washes.</h2>
              <p>
                Dark rinse, stonewash, black and raw selvedge. Straight, wide and tapered cuts,
                starting at {formatPrice(jeansFrom)}.
              </p>
              <Link to="/products?category=Jeans" className="primary-button">
                Shop jeans
              </Link>
            </div>

            <div className="editorial-image">
              {jeans.slice(0, 2).map((p) => (
                <Link key={p.id} to={`/products/${p.id}`}>
                  <img src={p.image} alt={p.name} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* NEW IN */}
      <section className="products-section" style={{ paddingTop: 72 }}>
        <div className="section-heading">
          <h2>New in</h2>
          <Link to="/products" className="section-link">
            See everything
          </Link>
        </div>

        <div className="home-product-grid">
          {newIn.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="home-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <h3>Nova Thread</h3>
            <p>Everyday clothes, cut simply.</p>
          </div>

          <div className="footer-links">
            <div>
              <h4>Shop</h4>
              <Link to="/products">All products</Link>
              {CATEGORIES.slice(0, 4).map((c) => (
                <Link key={c} to={`/products?category=${c}`}>
                  {c}
                </Link>
              ))}
            </div>

            <div>
              <h4>Account</h4>
              <Link to="/wishlist">Wishlist</Link>
              <Link to="/login">Log in</Link>
              <Link to="/signup">Create account</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
