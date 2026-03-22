import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { HOME_API, LOCATION_API } from "../../constant/constant";

const Footer = () => {
  const [homeData, setHomeData] = useState(null);
  const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [homeRes, locationRes] = await Promise.all([
          axios.get(HOME_API),
          axios.get(LOCATION_API)
        ]);
        setHomeData(homeRes.data);
        setLocationData(locationRes.data.location);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Location", path: "/location" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">

      {/* ===== MAIN FOOTER ===== */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">

        {/* ===== BRAND SECTION ===== */}
        <div className="flex flex-col gap-4">
          {homeData?.logo && (
            <img src={homeData.logo} alt="Logo"
              className="w-14 h-14 rounded-full object-cover border-2 border-gray-700" />
          )}
          <h2 className="text-xl font-bold text-white">
            {homeData?.shopName || "Samridhi Enterprises"}
          </h2>
          {homeData?.tagline && (
            <p className="text-blue-400 text-sm font-medium">{homeData.tagline}</p>
          )}
          {homeData?.description && (
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
              {homeData.description}
            </p>
          )}

          {/* Social / WhatsApp */}
          {homeData?.whatsapp && (
            <a href={`https://wa.me/${homeData.whatsapp}`} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition w-fit">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.864L.057 23.882a.5.5 0 00.611.611l6.018-1.475A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.52-5.16-1.427l-.37-.22-3.827.938.957-3.703-.242-.382A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              WhatsApp Us
            </a>
          )}
        </div>

        {/* ===== QUICK LINKS ===== */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4 border-b border-gray-700 pb-2">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path}
                  className="text-gray-400 hover:text-blue-400 text-sm transition flex items-center gap-2">
                  <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ===== CONTACT INFO ===== */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4 border-b border-gray-700 pb-2">
            Contact Info
          </h3>
          <div className="flex flex-col gap-3">

            {/* Phone */}
            {homeData?.phone && (
              <a href={`tel:${homeData.phone}`}
                className="flex items-start gap-3 hover:text-blue-400 transition">
                <div className="bg-gray-800 p-2 rounded-lg mt-0.5">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm text-gray-300">{homeData.phone}</p>
                </div>
              </a>
            )}

            {/* Email */}
            {homeData?.email && (
              <a href={`mailto:${homeData.email}`}
                className="flex items-start gap-3 hover:text-blue-400 transition">
                <div className="bg-gray-800 p-2 rounded-lg mt-0.5">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm text-gray-300">{homeData.email}</p>
                </div>
              </a>
            )}

            {/* Address */}
            {locationData && (
              <div className="flex items-start gap-3">
                <div className="bg-gray-800 p-2 rounded-lg mt-0.5">
                  <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="text-sm text-gray-300">
                    {locationData.address}, {locationData.city},
                    {locationData.state} - {locationData.pincode}
                  </p>
                </div>
              </div>
            )}

            {/* Working Hours */}
            {locationData?.workingHours && (
              <div className="flex items-start gap-3">
                <div className="bg-gray-800 p-2 rounded-lg mt-0.5">
                  <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Working Hours</p>
                  <p className="text-sm text-gray-300">{locationData.workingHours}</p>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* ===== BOTTOM BAR ===== */}
      <div className="border-t border-gray-800 py-4 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} {homeData?.shopName || "Samridhi Enterprises"}. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Made with ❤️ in India 🇮🇳
          </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
