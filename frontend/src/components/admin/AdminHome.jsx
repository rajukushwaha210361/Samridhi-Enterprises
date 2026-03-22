import { useEffect, useState } from "react";
import axios from "axios";
import { HOME_API } from "../../constant/constant";
import AdminProduct from "./AdminProduct";
import AdminAbout from "./AdminAbout";
import AdminContact from "./AdminContact";
import AdminLocation from "./AdminLocation";

// const HOME_API = `${HOME_API}`;

const AdminHome = () => {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [formData, setFormData] = useState({
    shopName: "", tagline: "", description: "",
    phone: "", email: "", whatsapp: ""
  });
  const [logo, setLogo] = useState(null);
  const [banners, setBanners] = useState([]);

  const token = localStorage.getItem("token");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${HOME_API}`);
      setHomeData(res.data);
      if (res.data) {
        setFormData({
          shopName: res.data.shopName || "",
          tagline: res.data.tagline || "",
          description: res.data.description || "",
          phone: res.data.phone || "",
          email: res.data.email || "",
          whatsapp: res.data.whatsapp || ""
        });
      }
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const buildFormData = () => {
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (logo) data.append("logo", logo);
    banners.forEach(b => data.append("banners", b));
    return data;
  };

  // CREATE
  const handleCreate = async () => {
    try {
      await axios.post(HOME_API, buildFormData(), authHeader);
      showMessage("✅ Homepage created successfully!", "success");
      fetchData();
    } catch (err) {
      showMessage("❌ Error: " + err.message, "error");
    }
  };

  // UPDATE
  const handleUpdate = async () => {
    try {
      await axios.put(`${HOME_API}/${homeData._id}`, buildFormData(), authHeader);
      showMessage("✅ Homepage updated successfully!", "success");
      setIsEditing(false);
      fetchData();
    } catch (err) {
      showMessage("❌ Error: " + err.message, "error");
    }
  };

  // DELETE
  const handleDelete = async () => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`${HOME_API}/${homeData._id}`, authHeader);
      showMessage("✅ Deleted successfully!", "success");
      setHomeData(null);
      setFormData({ shopName: "", tagline: "", description: "", phone: "", email: "", whatsapp: "" });
    } catch (err) {
      showMessage("❌ Error: " + err.message, "error");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">🏠 Homepage Manager</h1>
        {homeData && !isEditing && (
          <div className="flex gap-2">
            <button onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
              ✏️ Edit
            </button>
            <button onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
              🗑️ Delete
            </button>
          </div>
        )}
      </div>

      {/* Message */}
      {message.text && (
        <div className={`p-3 rounded-lg mb-5 text-sm font-medium ${
          message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}>
          {message.text}
        </div>
      )}

      {/* Preview Card */}
      {homeData && !isEditing && (
        <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden mb-6">

          {/* Banner Preview */}
          {homeData.banners?.length > 0 && (
            <div className="w-full h-48 overflow-hidden">
              <img src={homeData.banners[0]} alt="Banner"
                className="w-full h-full object-cover" />
            </div>
          )}

          <div className="p-5">
            <div className="flex gap-4 items-start">

              {/* Logo */}
              {homeData.logo && (
                <img src={homeData.logo} alt="Logo"
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200" />
              )}

              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800">{homeData.shopName}</h2>
                <p className="text-blue-600 text-sm font-medium">{homeData.tagline}</p>
                <p className="text-gray-500 text-sm mt-2">{homeData.description}</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>📞</span> {homeData.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>✉️</span> {homeData.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>💬</span> {homeData.whatsapp}
              </div>
            </div>

            {/* All Banners */}
            {homeData.banners?.length > 1 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-600 mb-2">All Banners:</p>
                <div className="flex gap-2 overflow-x-auto">
                  {homeData.banners.map((b, i) => (
                    <img key={i} src={b} alt={`Banner ${i}`}
                      className="w-28 h-16 object-cover rounded-lg  border" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Form */}
      {(!homeData || isEditing) && (
        <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-5">
            {homeData ? "✏️ Edit Homepage" : "➕ Create Homepage"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Text Fields */}
            {[
              { label: "Shop Name", name: "shopName", placeholder: "Samridhi Enterprises" },
              { label: "Tagline", name: "tagline", placeholder: "Keeping Your Trucks on the Road!" },
              { label: "Phone", name: "phone", placeholder: "9876543210" },
              { label: "Email", name: "email", placeholder: "info@example.com" },
              { label: "WhatsApp", name: "whatsapp", placeholder: "9876543210" },
            ].map(({ label, name, placeholder }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
                <input
                  type="text"
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Shop description..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Logo</label>
              {homeData?.logo && (
                <img src={homeData.logo} alt="Current Logo"
                  className="w-12 h-12 rounded-full object-cover mb-2 border" />
              )}
              <input type="file" accept="image/*"
                onChange={(e) => setLogo(e.target.files[0])}
                className="w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100" />
            </div>

            {/* Banners Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Banners (Multiple)
              </label>
              {homeData?.banners?.length > 0 && (
                <div className="flex gap-1 mb-2">
                  {homeData.banners.map((b, i) => (
                    <img key={i} src={b} alt={`b${i}`}
                      className="w-12 h-8 object-cover rounded border" />
                  ))}
                </div>
              )}
              <input type="file" accept="image/*" multiple
                onChange={(e) => setBanners([...e.target.files])}
                className="w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={homeData ? handleUpdate : handleCreate}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition">
              {homeData ? "💾 Update" : "➕ Create"}
            </button>
            {isEditing && (
              <button onClick={() => setIsEditing(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2.5 rounded-lg text-sm font-medium transition">
                Cancel
              </button>
            )}
          </div>
        </div>
      )}
      <AdminProduct/>
      <AdminAbout/>
      <AdminContact/>
      <AdminLocation/>
    </div>
  );
};

export default AdminHome;