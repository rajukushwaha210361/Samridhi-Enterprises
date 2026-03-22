import { useEffect, useState } from "react";
import axios from "axios";
import { CONTACT_API } from "../../constant/constant";

const AdminContact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });

  const token = localStorage.getItem("token");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => { fetchContacts(); }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get(CONTACT_API, authHeader);
      setContacts(res.data.contacts);
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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`${CONTACT_API}/${id}`, authHeader);
      showMessage("✅ Contact deleted!", "success");
      setSelectedContact(null);
      fetchContacts();
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
    <div className="max-w-6xl mx-auto p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">✉️ Messages</h1>
          <p className="text-sm text-gray-500 mt-1">
            Total: <span className="font-semibold text-blue-600">{contacts.length}</span> messages
          </p>
        </div>
      </div>

      {/* Message */}
      {message.text && (
        <div className={`p-3 rounded-lg mb-5 text-sm font-medium ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}>
          {message.text}
        </div>
      )}

      {contacts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-gray-400 text-lg">No messages yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* ===== CONTACTS LIST ===== */}
          <div className="flex flex-col gap-3 max-h-[80vh] overflow-y-auto pr-0">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                onClick={() => setSelectedContact(contact)}
                className={`bg-white rounded-xl border p-3 sm:p-4 cursor-pointer hover:shadow-md transition ${selectedContact?._id === contact._id
                    ? "border-blue-500 shadow-md"
                    : "border-gray-200"
                  }`}
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-xs sm:text-sm">
                        {contact.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-800 text-xs sm:text-sm truncate">
                        {contact.name}
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-500 truncate">
                        {contact.email}
                      </p>
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-400 flex-shrink-0 mt-0.5">
                    {new Date(contact.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric"
                    })}
                  </p>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-2 line-clamp-2">
                  {contact.message}
                </p>
              </div>
            ))}
          </div>

          {/* ===== CONTACT DETAIL ===== */}
          <div className="sticky top-20">
            {selectedContact ? (
              <div className="bg-white rounded-xl border border-gray-200 shadow p-4 sm:p-6">

                {/* Header */}
                <div className="flex justify-between items-start mb-4 sm:mb-5 gap-2">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-base sm:text-lg">
                        {selectedContact.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-sm sm:text-lg font-bold text-gray-800 truncate">
                        {selectedContact.name}
                      </h2>
                      <p className="text-[10px] sm:text-xs text-gray-400">
                        {new Date(selectedContact.createdAt).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(selectedContact._id)}
                    className="bg-red-50 hover:bg-red-100 text-red-500 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition flex-shrink-0">
                    Delete
                  </button>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col gap-3 mb-4 sm:mb-5">

                  {/* Phone */}
                  {selectedContact.phone && (
                    <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                      <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-400">Phone</p>
                        <a href={`tel:${selectedContact.phone}`}
                          className="text-xs sm:text-sm font-semibold text-gray-800 hover:text-blue-600 truncate block">
                          {selectedContact.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Email */}
                  <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                    <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-gray-400">Email</p>
                      <a href={`mailto:${selectedContact.email}`}
                        className="text-xs sm:text-sm font-semibold text-gray-800 hover:text-blue-600 truncate block">
                        {selectedContact.email}
                      </a>
                    </div>
                  </div>

                </div>

                {/* Message */}
                <div className="bg-blue-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-5">
                  <p className="text-xs text-blue-400 font-medium mb-2">Message</p>
                  <p className="text-xs sm:text-sm text-blue-800 leading-relaxed">
                    {selectedContact.message}
                  </p>
                </div>

                {/* Reply Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <a href={`mailto:${selectedContact.email}?subject=Re: Your Enquiry&body=Hello ${selectedContact.name},%0D%0A%0D%0AThank you for contacting Samridhi Enterprises.`}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-xs sm:text-sm font-medium transition"
                  >
                    ✉️ Reply Email
                  </a>
                  {selectedContact.phone && (
                    <a href={`https://wa.me/91${selectedContact.phone}?text=Hello ${selectedContact.name}, Thank you for contacting Samridhi Enterprises!`}
                      target="_blank" rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-xl text-xs sm:text-sm font-medium transition"
                    >
                      💬 WhatsApp
                    </a>
                  )}
                </div>

              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-10 text-center">
                <p className="text-4xl mb-3">👈</p>
                <p className="text-gray-400 text-sm">Select a message to view details</p>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
};

export default AdminContact;