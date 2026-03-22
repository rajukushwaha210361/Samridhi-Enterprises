import { useEffect, useState } from "react";
import axios from "axios";
import { ABOUT_API } from "../../constant/constant";

// const ABOUT_API = "http://localhost:5000/api/homepage";

const About = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await axios.get(ABOUT_API);
        setAbout(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  if (!about) return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-gray-400 text-lg">About info not found</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ===== HERO ===== */}
      <div className="bg-white border-b border-gray-200 py-12 px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-900">About Us</h1>
        {about.tagline && (
          <p className="text-blue-600 font-medium mt-2">{about.tagline}</p>
        )}
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col gap-8">

        {/* ===== SHOP INFO ===== */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row gap-6 items-center">
          {about.logo && (
            <img src={about.logo} alt="Shop Logo"
              className="w-32 h-32 object-cover rounded-2xl border-2 border-gray-200 " />
          )}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{about.shopName}</h2>
            {about.tagline && (
              <p className="text-blue-600 font-medium mt-1">{about.tagline}</p>
            )}
            {about.description && (
              <p className="text-gray-600 mt-3 leading-relaxed text-sm">{about.description}</p>
            )}
          </div>
        </div>

        {/* ===== STATS ===== */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: "5+", label: "Years Experience" },
            { value: "100+", label: "Happy Customers" },
            { value: "24/7", label: "Support" },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 text-center">
              <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ===== MISSION & VISION ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-2xl border border-blue-100 p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🎯</span>
              <h3 className="text-lg font-bold text-blue-800">Our Mission</h3>
            </div>
            <p className="text-blue-700 text-sm leading-relaxed">
              To provide high-quality truck parts and accessories at competitive prices,
              ensuring every vehicle stays on the road with reliable performance.
            </p>
          </div>
          <div className="bg-green-50 rounded-2xl border border-green-100 p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🔭</span>
              <h3 className="text-lg font-bold text-green-800">Our Vision</h3>
            </div>
            <p className="text-green-700 text-sm leading-relaxed">
              To become the most trusted name in truck spare parts industry,
              serving customers across India with excellence and dedication.
            </p>
          </div>
        </div>

        {/* ===== WHY CHOOSE US ===== */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-5">⭐ Why Choose Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Genuine Parts", description: "We provide only original and certified truck parts" },
              { title: "Best Price", description: "Competitive pricing with no compromise on quality" },
              { title: "Expert Team", description: "Years of experience in truck parts industry" },
              // { title: "Fast Delivery", description: "Quick delivery to your doorstep" },
              { title: "Wide Range", description: "All types of truck parts under one roof" },
              { title: "After Sales Support", description: "Dedicated support after every purchase" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-lg mt-0.5">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== BRANDS ===== */}
        {/* <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-5">🏷️ Brands We Deal In</h2>
          <div className="flex flex-wrap gap-3">
            {["Tata", "Ashok Leyland", "Mahindra", "Eicher", "BharatBenz",
              "Force Motors", "Bosch", "Wabco", "Minda", "Lumax"].map((brand, i) => (
              <span key={i}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium border border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition">
                {brand}
              </span>
            ))}
          </div>
        </div> */}

        {/* ===== CONTACT SECTION ===== */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-5">📞 Get In Touch</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            {about.phone && (
              <a href={`tel:${about.phone}`}
                className="flex items-center gap-3 bg-blue-50 rounded-xl p-4 hover:bg-blue-100 transition">
                <div className="bg-blue-100 p-2.5 rounded-xl">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm font-semibold text-gray-800">{about.phone}</p>
                </div>
              </a>
            )}

            {about.email && (
              <a href={`mailto:${about.email}`}
                className="flex items-center gap-3 bg-green-50 rounded-xl p-4 hover:bg-green-100 transition">
                <div className="bg-green-100 p-2.5 rounded-xl">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-semibold text-gray-800">{about.email}</p>
                </div>
              </a>
            )}

            {about.whatsapp && (
              <a href={`https://wa.me/${about.whatsapp}`} target="_blank" rel="noreferrer"
                className="flex items-center gap-3 bg-emerald-50 rounded-xl p-4 hover:bg-emerald-100 transition">
                <div className="bg-emerald-100 p-2.5 rounded-xl">
                  <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.864L.057 23.882a.5.5 0 00.611.611l6.018-1.475A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.52-5.16-1.427l-.37-.22-3.827.938.957-3.703-.242-.382A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">WhatsApp</p>
                  <p className="text-sm font-semibold text-gray-800">{about.whatsapp}</p>
                </div>
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;