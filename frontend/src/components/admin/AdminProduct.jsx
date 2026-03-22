import { useEffect, useState } from "react";
import axios from "axios";
import { PRODUCT_API } from "../../constant/constant";

// const PRODUCT_API = "http://localhost:5000/api/product";

const AdminProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "", partNumber: "", description: "",
    price: "", stock: "", brand: "", isActive: true
  });

  const token = localStorage.getItem("token");
  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(PRODUCT_API);
      setProducts(res.data.products);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  const resetForm = () => {
    setFormData({ name: "", partNumber: "", description: "", price: "", stock: "", brand: "", isActive: true });
    setImages([]);
    setEditProduct(null);
    setIsFormOpen(false);
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setFormData({
      name: product.name || "",
      partNumber: product.partNumber || "",
      description: product.description || "",
      price: product.price || "",
      stock: product.stock || "",
      brand: product.brand || "",
      isActive: product.isActive ?? true
    });
    setIsFormOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const buildFormData = () => {
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    images.forEach(img => data.append("images", img));
    return data;
  };

  // CREATE
  const handleCreate = async () => {
    try {
      await axios.post(PRODUCT_API, buildFormData(), authHeader);
      showMessage("✅ Product created successfully!", "success");
      fetchProducts();
      resetForm();
    } catch (err) {
      showMessage("❌ Error: " + err.message, "error");
    }
  };

  // UPDATE
  const handleUpdate = async () => {
    try {
      await axios.put(`${PRODUCT_API}/${editProduct._id}`, buildFormData(), authHeader);
      showMessage("✅ Product updated successfully!", "success");
      fetchProducts();
      resetForm();
    } catch (err) {
      showMessage("❌ Error: " + err.message, "error");
    }
  };

  // SOFT DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`${PRODUCT_API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showMessage("✅ Product deleted!", "success");
      fetchProducts();
    } catch (err) {
      showMessage(" Error: " + err.message, "error");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">📦 Products Manager</h1>
        <button
          onClick={() => { resetForm(); setIsFormOpen(true); }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          ➕ Add Product
        </button>
      </div>

      {/* Message */}
      {message.text && (
        <div className={`p-3 rounded-lg mb-5 text-sm font-medium ${
          message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}>
          {message.text}
        </div>
      )}

      {/* Products Table */}
      {products.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-400 text-lg">No products found</p>
          <button onClick={() => setIsFormOpen(true)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
            ➕ Add First Product
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Image</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Name</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Part No.</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Brand</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Price</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Stock</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Status</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50 transition">
                    {/* Image */}
                    <td className="px-4 py-3">
                      {product.images?.length > 0 ? (
                        <img src={product.images[0]} alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg border" />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-gray-300 text-xs">No img</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800">{product.name}</td>
                    <td className="px-4 py-3 text-gray-500">{product.partNumber}</td>
                    <td className="px-4 py-3 text-gray-500">{product.brand || "-"}</td>
                    <td className="px-4 py-3 text-blue-600 font-semibold">₹{product.price}</td>
                    <td className="px-4 py-3 text-gray-600">{product.stock}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.isActive
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-500"
                      }`}>
                        {product.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(product)}
                          className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-medium transition">
                          ✏️ Edit
                        </button>
                        <button onClick={() => handleDelete(product._id)}
                          className="bg-red-50 hover:bg-red-100 text-red-500 px-3 py-1.5 rounded-lg text-xs font-medium transition">
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===== FORM MODAL ===== */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4"
          onClick={resetForm}>
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}>

            {/* Modal Header */}
            <div className="flex justify-between items-center p-5 border-b">
              <h2 className="text-lg font-bold text-gray-800">
                {editProduct ? "✏️ Edit Product" : "➕ Add Product"}
              </h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form */}
            <div className="p-5 flex flex-col gap-4">

              {[
                { label: "Product Name *", name: "name", placeholder: "Brake Pad" },
                { label: "Part Number *", name: "partNumber", placeholder: "BP-1234" },
                { label: "Brand", name: "brand", placeholder: "Bosch" },
                { label: "Price *", name: "price", placeholder: "599", type: "number" },
                { label: "Stock", name: "stock", placeholder: "50", type: "number" },
              ].map(({ label, name, placeholder, type }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
                  <input
                    type={type || "text"}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Product description..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Images */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Images (Multiple)
                </label>
                {editProduct?.images?.length > 0 && (
                  <div className="flex gap-2 mb-2">
                    {editProduct.images.map((img, i) => (
                      <img key={i} src={img} alt={`img-${i}`}
                        className="w-12 h-12 object-cover rounded-lg border" />
                    ))}
                  </div>
                )}
                <input
                  type="file" accept="image/*" multiple
                  onChange={(e) => setImages([...e.target.files])}
                  className="w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
                />
              </div>

              {/* isActive */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="w-4 h-4 accent-blue-600"
                />
                <label className="text-sm font-medium text-gray-600">Active Product</label>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-2">
                <button
                  onClick={editProduct ? handleUpdate : handleCreate}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium transition"
                >
                  {editProduct ? "💾 Update" : "➕ Create"}
                </button>
                <button onClick={resetForm}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2.5 rounded-lg text-sm font-medium transition">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminProduct;