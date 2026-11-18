import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

function Products() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState(
    searchParams.get("category") || "All"
  );

  const [budget, setBudget] = useState("All");

  const [sort, setSort] = useState(searchParams.get("sort") || "");

  useEffect(() => {
    fetchProducts();
  }, []);

  /* Keep category synced with Home page */
  useEffect(() => {
    setCategory(searchParams.get("category") || "All");
  }, [searchParams]);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");

      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  /* Delete product */
  const handleDelete = async (id) => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) {
      alert("Please login to delete products.");

      navigate("/login");

      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/products/${id}`);

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => product.id !== id
        )
      );

      alert("Product deleted successfully!");
    } catch (error) {
      console.error(
        "Error deleting product:",
        error
      );

      alert("Failed to delete product");
    }
  };

  /* Search + filters */
  const filteredProducts = products.filter(
    (product) => {
      const searchText = search
        .toLowerCase()
        .trim();

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(searchText) ||
        product.brand
          .toLowerCase()
          .includes(searchText) ||
        product.category
          .toLowerCase()
          .includes(searchText);

      const matchesCategory =
        category === "All" ||
        product.category === category;

      const matchesBudget =
        budget === "All" ||
        product.budget === budget;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBudget
      );
    }
  );

  /* Sorting */
  const finalProducts = [...filteredProducts];

  if (sort === "high") {
    finalProducts.sort(
      (a, b) => b.rating - a.rating
    );
  }

  if (sort === "low") {
    finalProducts.sort(
      (a, b) => a.rating - b.rating
    );
  }

  if (sort === "priceLow") {
    finalProducts.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "priceHigh") {
    finalProducts.sort(
      (a, b) => b.price - a.price
    );
  }

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setBudget("All");
    setSort("");
  };

  return (
    <div className="shop-page">

      {/* =====================================
          Shop hero
      ====================================== */}

      <section className="shop-hero">

        <div className="shop-hero-content">

          <h1>The shop</h1>

          <p>Dresses, shirts, denim, jackets, shoes and trousers. Filter by category or budget, or search by name.</p>

        </div>

        <div className="shop-hero-side">

          <strong>{products.length}</strong>
          <span>pieces</span>

        </div>

      </section>


      {/* =====================================
          Toolbar
      ====================================== */}

      <section className="shop-toolbar">

        {/* SEARCH */}

        <div className="shop-search">

          <span>⌕</span>

          <input
            type="text"
            placeholder="Search by name, brand or category"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="clear-search"
            >
              ×
            </button>
          )}

        </div>


        {/* FILTERS */}

        <div className="shop-filters">

          {/* CATEGORY */}

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            <option value="All">
              All Categories
            </option>

            <option value="Dresses">
              Dresses
            </option>

            <option value="Shirts">
              Shirts
            </option>

            <option value="Jeans">
              Jeans
            </option>

            <option value="Jackets">
              Jackets
            </option>

            <option value="Shoes">
              Shoes
            </option>

            <option value="Trousers">
              Trousers
            </option>
          </select>


          {/* BUDGET */}

          <select
            value={budget}
            onChange={(e) =>
              setBudget(e.target.value)
            }
          >
            <option value="All">
              All Budgets
            </option>

            <option value="Low">
              Low
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="High">
              High
            </option>
          </select>


          {/* SORT */}

          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
          >
            <option value="">
              Sort By
            </option>

            <option value="high">
              Rating: High to Low
            </option>

            <option value="low">
              Rating: Low to High
            </option>

            <option value="priceLow">
              Price: Low to High
            </option>

            <option value="priceHigh">
              Price: High to Low
            </option>
          </select>

        </div>


        {/* ADD PRODUCT */}

        <Link
          to="/add-product"
          className="shop-add-button"
        >
          Add product
        </Link>

      </section>


      {/* =====================================
          Active filter / result info
      ====================================== */}

      <section className="shop-result-bar">

        <div>

          <span className="result-number">{finalProducts.length}</span>
          <span>{finalProducts.length === 1 ? "piece" : "pieces"}</span>

        </div>


        {(search ||
          category !== "All" ||
          budget !== "All" ||
          sort) && (

          <button
            className="clear-filters"
            onClick={clearFilters}
          >
            Clear filters
          </button>

        )}

      </section>


      {/* =====================================
          Products
      ====================================== */}

      <section className="shop-products">

        {finalProducts.length > 0 ? (

          <div className="product-grid">

            {finalProducts.map(
              (product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onDelete={handleDelete}
                />
              )
            )}

          </div>

        ) : (

          <div className="shop-empty">

            <div className="shop-empty-icon">
              ♡
            </div>

            <h2>
              Nothing found.
            </h2>

            <p>
              Try changing your search or
              filters to discover more styles.
            </p>

            <button
              onClick={clearFilters}
              className="primary-button"
            >
              Show all products
            </button>

          </div>

        )}

      </section>

    </div>
  );
}

export default Products;