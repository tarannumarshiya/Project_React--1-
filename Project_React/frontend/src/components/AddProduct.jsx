import { useState } from "react";

function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    category: "veg",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);

      alert("Product Added Successfully!");

      setFormData({
        name: "",
        price: "",
        image: "",
        category: "veg",
      });
    } catch (error) {
      console.log(error);
      alert("Failed to add product");
    }
  };

  return (
    <section className="min-h-screen bg-orange-50 flex justify-center items-center px-4">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-3xl shadow-xl space-y-5"
      >
        <h1 className="text-3xl font-bold text-center text-orange-500">
          Add Product
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="veg">Veg</option>
          <option value="nonveg">Non-Veg</option>
        </select>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition"
        >
          Add Product
        </button>
      </form>

    </section>
  );
}

export default AddProduct;