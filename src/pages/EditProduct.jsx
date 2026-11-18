import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    brand: "",
    category: "Dresses",
    budget: "Low",
    price: "",
    rating: "",
    size: "",
    color: "",
    material: "",
    description: "",
    image: ""
  });

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/products/${id}`, {
        ...product,
        price: Number(product.price),
        rating: Number(product.rating) || 0
      });

      alert("Product updated successfully!");

      navigate("/products");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    }
  };

  return (
    <div className="form-page">

      <div className="form-container">

        <h1>
          Edit Product
        </h1>

        <form onSubmit={handleSubmit}>

          {/* PRODUCT NAME */}

          <label>
            Product Name
          </label>

          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />


          {/* BRAND */}

          <label>
            Brand
          </label>

          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            placeholder="Enter brand"
            required
          />


          {/* CATEGORY */}

          <label>
            Category
          </label>

          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
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

          <label>
            Budget
          </label>

          <select
            name="budget"
            value={product.budget}
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


          {/* PRICE */}

          <label>
            Price
          </label>

          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Enter price"
            min="0"
            required
          />


          {/* RATING */}

          <label>
            Rating (0-5)
          </label>

          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            name="rating"
            value={product.rating}
            onChange={handleChange}
            placeholder="Enter rating"
          />


          {/* SIZE */}

          <label>
            Sizes
          </label>

          <input
            type="text"
            name="size"
            value={product.size}
            onChange={handleChange}
            placeholder="S, M, L, XL"
          />


          {/* COLOR */}

          <label>
            Color
          </label>

          <input
            type="text"
            name="color"
            value={product.color}
            onChange={handleChange}
            placeholder="Enter color"
          />


          {/* MATERIAL */}

          <label>
            Material
          </label>

          <input
            type="text"
            name="material"
            value={product.material}
            onChange={handleChange}
            placeholder="Enter material"
          />


          {/* DESCRIPTION */}

          <label>
            Description
          </label>

          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Enter product description"
            required
          />


          {/* IMAGE */}

          <label>
            Image URL
          </label>

          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            required
          />


          {/* SAVE */}

          <button
            type="submit"
            className="shop-button"
          >
            Save Changes
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditProduct;