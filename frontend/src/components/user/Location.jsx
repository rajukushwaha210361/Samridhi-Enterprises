import { useEffect, useState } from "react";
import axios from "axios";
import { LOCATION_API } from "../../constant/constant";

// const LOCATION_API = "http://localhost:5000/api/location";

const Location = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await axios.get(LOCATION_API);
        setLocation(res.data.location);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLocation();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  if (!location) return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-gray-400 text-lg">Location not found</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-300">

      {/* ===== HERO SECTION ===== */}
      <div className="bg-white border-b border-gray-200 py-10 px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Our Location</h1>
        <p className="text-gray-500 mt-2 text-sm">Visit us at our store</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 flex flex-col gap-6">

        {/* ===== ADDRESS CARD ===== */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-1">Address</h2>
              <p className="text-gray-600">{location.address}</p>
              <p className="text-gray-600">{location.city}, {location.state} - {location.pincode}</p>
            </div>
          </div>
        </div>

        {/* ===== CONTACT CARDS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {/* Phone */}
          {location.phone && (
            <a href={`tel:${location.phone}`}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 flex items-center gap-4 hover:shadow-md transition">
              <div className="bg-blue-100 p-3 rounded-xl">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p className="text-sm font-semibold text-gray-800">{location.phone}</p>
              </div>
            </a>
          )}

          {/* Email */}
          {location.email && (
            <a href={`mailto:${location.email}`}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-3 sm:p-5 flex items-start gap-3 sm:gap-4 hover:shadow-md transition">
              <div className="bg-green-100 p-2.5 sm:p-3 rounded-xl flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-xs sm:text-sm font-semibold text-gray-800 break-all">
                  {location.email}
                </p>
              </div>
            </a>
          )}
          {/* Working Hours */}
          {location.workingHours && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-xl">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        </div>

        {/* ===== MAP SECTION ===== */}

        {location.mapLink && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

            {/* Static Map Image */}
            <div className="w-full h-48 bg-gray-100 flex flex-col items-center justify-center gap-3">
              <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-gray-400 text-sm">
                {location.address}, {location.city}
              </p>
            </div>

            {/* Open Maps Button */}

            <a href={location.mapLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-4 text-sm font-medium transition w-full"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              📍 Open in Google Maps
            </a>
          </div>
        )}


      </div>
    </div>
  );
};

export default Location;