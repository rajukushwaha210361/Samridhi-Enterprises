import { useEffect, useState } from "react";
import axios from "axios";
import { PRODUCT_API, HOME_API } from "../../constant/constant";

// const PRODUCT_API = "http://localhost:5000/api/product";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [whatsapp, setWhatsapp] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    fetchProducts();
    fetchWhatsapp(); // 👈 add karo
  }, []);

  const fetchWhatsapp = async () => {
    try {
      const res = await axios.get(HOME_API);
      setWhatsapp(res.data.whatsapp);
    } catch (err) {
      console.error(err);
    }
  };
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

  // Search filter
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.partNumber.toLowerCase().includes(search.toLowerCase()) ||
    p.brand?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="bg-gray-200">

      {/* ===== HERO SECTION ===== */}
      <div className="bg-white border-b border-gray-200 py-10 px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
        <p className="text-gray-500 mt-2 text-sm">Quality Truck Parts & Accessories</p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mt-6 relative">
          <input
            type="text"
            placeholder="Search by name, part number, brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-full px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
          />
          <svg className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2"
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* ===== PRODUCTS GRID ===== */}
      <div className="max-w-6xl mx-auto px-4 py-8">

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No products found</p>
          </div>
        ) : (
          // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                onClick={() => setSelectedProduct(product)}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                {/* Product Image */}
                {/* <div className="w-full h-44 bg-gray-100 overflow-hidden"> */}
                <div className="w-full h-32 sm:h-44 bg-gray-100 overflow-hidden">
                  {product.images?.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                {/* <div className="p-4">
                  <h3 className="font-semibold text-gray-800 text-sm truncate">{product.name}</h3> */}
                <div className="p-2 sm:p-4">
                  <h3 className="font-semibold text-gray-800 text-xs sm:text-sm truncate">{product.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Part No: {product.partNumber}</p>
                  {product.brand && (
                    <p className="text-xs text-blue-600 mt-0.5">{product.brand}</p>
                  )}
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-blue-600 font-bold text-sm">₹{product.price}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${product.stock > 0
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-500"
                      }`}>
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===== PRODUCT DETAIL MODAL ===== */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4"
          onClick={() => setSelectedProduct(null)}>
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}>

            {/* Close Button */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-bold text-gray-800">{selectedProduct.name}</h2>
              <button onClick={() => setSelectedProduct(null)}
                className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Images */}
            {selectedProduct.images?.length > 0 && (
              <div className="w-full h-56 overflow-hidden">
                <img src={selectedProduct.images[0]} alt={selectedProduct.name}
                  className="w-full h-full object-cover" />
              </div>
            )}

            {/* Details */}
            <div className="p-5">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs">Part Number</p>
                  <p className="font-semibold text-gray-800">{selectedProduct.partNumber}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs">Brand</p>
                  <p className="font-semibold text-gray-800">{selectedProduct.brand || "N/A"}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs">Price</p>
                  <p className="font-bold text-blue-600 text-base">₹{selectedProduct.price}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs">Stock</p>
                  <p className={`font-semibold ${selectedProduct.stock > 0 ? "text-green-600" : "text-red-500"}`}>
                    {selectedProduct.stock > 0 ? `${selectedProduct.stock} units` : "Out of Stock"}
                  </p>
                </div>
              </div>

              {selectedProduct.description && (
                <div className="mt-4">
                  <p className="text-xs text-gray-500 mb-1">Description</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{selectedProduct.description}</p>
                </div>
              )}

              {/* Multiple Images */}
              {selectedProduct.images?.length > 1 && (
                <div className="mt-4">
                  <p className="text-xs text-gray-500 mb-2">More Images</p>
                  <div className="flex gap-2 overflow-x-auto">
                    {selectedProduct.images.map((img, i) => (
                      <img key={i} src={img} alt={`img-${i}`}
                        className="w-16 h-16 object-cover rounded-lg border" />
                    ))}
                  </div>
                </div>
              )}

              {/* WhatsApp Enquiry */}

              {/* <a href={`https://wa.me/919876543210?text=Hello! I'm interested in ${selectedProduct.name} (Part No: ${selectedProduct.partNumber}). Price: ₹${selectedProduct.price}`}
                target="_blank"
                rel="noreferrer"
                className="mt-5 w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl text-sm font-medium transition"
              >
                💬 Enquire on WhatsApp
              </a> */}
              <a href={`https://wa.me/91${whatsapp}?text=Hello! I'm interested in ${selectedProduct.name} (Part No: ${selectedProduct.partNumber}). Price: ₹${selectedProduct.price}`}
                target="_blank"
                rel="noreferrer"
                className="mt-5 w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl text-sm font-medium transition"
              >
                💬 Enquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Product;