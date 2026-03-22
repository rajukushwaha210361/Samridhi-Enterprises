import { useEffect, useState } from "react";
import axios from "axios";
import { ABOUT_API } from "../../constant/constant";

// const ABOUT_API = "http://localhost:5000/api/homepage";

const AdminAbout = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [formData, setFormData] = useState({
    shopName: "", tagline: "", description: "",
    phone: "", email: "", whatsapp: ""
  });
  const [logo, setLogo] = useState(null);

  const token = localStorage.getItem("token");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(ABOUT_API);
      setAbout(res.data);
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
    return data;
  };

  // UPDATE ONLY - About sirf update hoga
  const handleUpdate = async () => {
    try {
      await axios.put(`${ABOUT_API}/${about._id}`, buildFormData(), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      showMessage("✅ About updated successfully!", "success");
      setIsEditing(false);
      fetchData();
    } catch (err) {
      showMessage("❌ Error: " + err.response?.data?.message, "error");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  if (!about) return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-gray-400">Homepage data nahi mila — pehle Homepage create karo!</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">ℹ️ About Manager</h1>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
            ✏️ Edit
          </button>
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

      {/* Preview */}
      {!isEditing && (
        <div className="bg-white rounded-xl shadow border border-gray-200 p-6 flex flex-col gap-5">

          {/* Logo + Name */}
          <div className="flex items-center gap-4">
            {about.logo ? (
              <img src={about.logo} alt="Logo"
                className="w-20 h-20 rounded-2xl object-cover border-2 border-gray-200" />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            <div>
              <h2 className="text-xl font-bold text-gray-800">{about.shopName}</h2>
              <p className="text-blue-600 text-sm font-medium">{about.tagline}</p>
            </div>
          </div>

          {/* Description */}
          {about.description && (
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1 font-medium">Description</p>
              <p className="text-gray-700 text-sm leading-relaxed">{about.description}</p>
            </div>
          )}

          {/* Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t pt-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-blue-500">📞</span>
              <div>
                <p className="text-xs text-gray-400">Phone</p>
                <p className="font-medium text-gray-700">{about.phone || "—"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-500">✉️</span>
              <div>
                <p className="text-xs text-gray-400">Email</p>
                <p className="font-medium text-gray-700">{about.email || "—"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-emerald-500">💬</span>
              <div>
                <p className="text-xs text-gray-400">WhatsApp</p>
                <p className="font-medium text-gray-700">{about.whatsapp || "—"}</p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Edit Form */}
      {isEditing && (
        <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-5">✏️ Edit About Info</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {[
              { label: "Shop Name", name: "shopName", placeholder: "Samridhi Enterprises" },
              { label: "Tagline", name: "tagline", placeholder: "Manufacturing of MS Parts" },
              { label: "Phone", name: "phone", placeholder: "8127997400" },
              { label: "Email", name: "email", placeholder: "info@samridhi.com" },
              { label: "WhatsApp", name: "whatsapp", placeholder: "9506775767" },
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
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">Logo</label>
              {about.logo && (
                <img src={about.logo} alt="Current Logo"
                  className="w-16 h-16 rounded-xl object-cover mb-2 border" />
              )}
              <input type="file" accept="image/*"
                onChange={(e) => setLogo(e.target.files[0])}
                className="w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100" />
            </div>

          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button onClick={handleUpdate}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition">
              💾 Update
            </button>
            <button onClick={() => setIsEditing(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2.5 rounded-lg text-sm font-medium transition">
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminAbout;