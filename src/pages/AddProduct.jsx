import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    budget: "Medium",
    price: "",
    rating: "",
    size: "",
    color: "",
    material: "",
    image: "",
    description: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category) {
      alert("Please select a category.");
      return;
    }

    try {
      setLoading(true);

      const newProduct = {
        ...formData,
        price: Number(formData.price),
        rating: Number(formData.rating)
      };

      await api.post("/products", newProduct);

      alert("Product added successfully!");

      navigate("/products");
    } catch (error) {
      console.error(
        "Error adding product:",
        error
      );

      alert("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-page">

      <div className="add-product-container">

        {/* HEADER */}

        <div className="add-product-header">

          <h1>Add a product</h1>

          <p>New pieces appear in the shop straight away.</p>

        </div>


        {/* FORM */}

        <form
          className="add-product-form"
          onSubmit={handleSubmit}
        >

          {/* PRODUCT NAME */}

          <div className="form-group">

            <label>
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Example: Classic Linen Shirt"
              required
            />

          </div>


          {/* BRAND */}

          <div className="form-group">

            <label>
              Brand
            </label>

            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Example: North & Loom"
              required
            />

          </div>


          {/* CATEGORY */}

          <div className="form-group">

            <label>
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Category
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

          </div>


          {/* BUDGET */}

          <div className="form-group">

            <label>
              Budget
            </label>

            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
            >
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

          </div>


          {/* PRICE */}

          <div className="form-group">

            <label>
              Price (₹)
            </label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="1999"
              min="0"
              required
            />

          </div>


          {/* RATING */}

          <div className="form-group">

            <label>
              Rating
            </label>

            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              placeholder="4.5"
              min="0"
              max="5"
              step="0.1"
              required
            />

          </div>


          {/* SIZE */}

          <div className="form-group">

            <label>
              Size
            </label>

            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
              placeholder="S, M, L, XL"
              required
            />

          </div>


          {/* COLOR */}

          <div className="form-group">

            <label>
              Color
            </label>

            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="Black"
              required
            />

          </div>


          {/* MATERIAL */}

          <div className="form-group">

            <label>
              Material
            </label>

            <input
              type="text"
              name="material"
              value={formData.material}
              onChange={handleChange}
              placeholder="Cotton"
              required
            />

          </div>


          {/* IMAGE */}

          <div className="form-group">

            <label>
              Image URL
            </label>

            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://..."
              required
            />

          </div>


          {/* DESCRIPTION */}

          <div className="form-group form-group-full">

            <label>
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the product..."
              rows="5"
              required
            />

          </div>


          {/* BUTTONS */}

          <div className="add-product-actions">

            <button
              type="button"
              className="secondary-button"
              onClick={() =>
                navigate("/products")
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
              disabled={loading}
            >
              {loading
                ? "Adding Product..."
                : "Add Product"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddProduct;