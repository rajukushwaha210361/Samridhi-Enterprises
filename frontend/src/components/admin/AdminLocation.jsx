import { useEffect, useState } from "react";
import axios from "axios";
import { LOCATION_API } from "../../constant/constant";

// const LOCATION_API = "http://localhost:5000/api/location";

const AdminLocation = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [formData, setFormData] = useState({
    address: "", city: "", state: "", pincode: "",
    phone: "", email: "", mapLink: "", workingHours: ""
  });

  const token = localStorage.getItem("token");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(LOCATION_API);
      setLocation(res.data.location);
      if (res.data.location) {
        setFormData({
          address: res.data.location.address || "",
          city: res.data.location.city || "",
          state: res.data.location.state || "",
          pincode: res.data.location.pincode || "",
          phone: res.data.location.phone || "",
          email: res.data.location.email || "",
          mapLink: res.data.location.mapLink || "",
          workingHours: res.data.location.workingHours || ""
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

  // CREATE
  const handleCreate = async () => {
    try {
      await axios.post(LOCATION_API, formData, authHeader);
      showMessage("✅ Location created successfully!", "success");
      fetchData();
      setIsEditing(false);
    } catch (err) {
      showMessage("❌ Error: " + err.response?.data?.message, "error");
    }
  };

  // UPDATE
  const handleUpdate = async () => {
    try {
      await axios.put(`${LOCATION_API}/${location._id}`, formData, authHeader);
      showMessage("✅ Location updated successfully!", "success");
      fetchData();
      setIsEditing(false);
    } catch (err) {
      showMessage("❌ Error: " + err.response?.data?.message, "error");
    }
  };

  // DELETE
  const handleDelete = async () => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`${LOCATION_API}/${location._id}`, authHeader);
      showMessage("✅ Location deleted!", "success");
      setLocation(null);
      setFormData({
        address: "", city: "", state: "", pincode: "",
        phone: "", email: "", mapLink: "", workingHours: ""
      });
    } catch (err) {
      showMessage("❌ Error: " + err.response?.data?.message, "error");
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
        <h1 className="text-2xl font-bold text-gray-800">📍 Location Manager</h1>
        {location && !isEditing && (
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
      {location && !isEditing && (
        <div className="bg-white rounded-xl shadow border border-gray-200 p-6 flex flex-col gap-4">

          {/* Address */}
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2.5 rounded-xl">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500">Address</p>
              <p className="font-semibold text-gray-800">{location.address}</p>
              <p className="text-gray-600 text-sm">{location.city}, {location.state} - {location.pincode}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t pt-4">

            {location.phone && (
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2.5 rounded-xl">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm font-semibold text-gray-800">{location.phone}</p>
                </div>
              </div>
            )}

            {location.email && (
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2.5 rounded-xl">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-semibold text-gray-800">{location.email}</p>
                </div>
              </div>
            )}

            {location.workingHours && (
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2.5 rounded-xl">
                  <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Working Hours</p>
                  <p className="text-sm font-semibold text-gray-800">{location.workingHours}</p>
                </div>
              </div>
            )}

            {location.mapLink && (
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-2.5 rounded-xl">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Map Link</p>
                  <a href={location.mapLink} target="_blank" rel="noreferrer"
                    className="text-sm font-semibold text-blue-600 hover:underline">
                    View on Google Maps →
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Form */}
      {(!location || isEditing) && (
        <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-5">
            {location ? "✏️ Edit Location" : "➕ Add Location"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Address *", name: "address", placeholder: "123, MG Road", span: true },
              { label: "City *", name: "city", placeholder: "Delhi" },
              { label: "State *", name: "state", placeholder: "Delhi" },
              { label: "Pincode *", name: "pincode", placeholder: "110001" },
              { label: "Phone", name: "phone", placeholder: "9876543210" },
              { label: "Email", name: "email", placeholder: "info@example.com" },
              { label: "Working Hours", name: "workingHours", placeholder: "Mon-Sat: 9AM - 6PM" },
              { label: "Map Link", name: "mapLink", placeholder: "https://maps.google.com/...", span: true },
            ].map(({ label, name, placeholder, span }) => (
              <div key={name} className={span ? "sm:col-span-2" : ""}>
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
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={location ? handleUpdate : handleCreate}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition">
              {location ? "💾 Update" : "➕ Create"}
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
    </div>
  );
};

export default AdminLocation;