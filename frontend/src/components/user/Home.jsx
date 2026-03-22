// import { useEffect, useState } from "react";
// import axios from "axios";
// import { HOME_API } from "../../constant/constant";
// import Product from "./Product";
// import Location from "./Location";
// import About from "./About";
// import Contact from "./Contact";
// import Footer from "./Footer";

// const Home = () => {
//     const [homeData, setHomeData] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchHomeData = async () => {
//             try {
//                 const res = await axios.get(`${HOME_API}`);
//                 setHomeData(res.data);
//             } catch (error) {
//                 console.error("Error fetching homepage data:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchHomeData();
//     }, []);

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
//             </div>
//         );
//     }

//     if (!homeData) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <p className="text-gray-500 text-lg">No data found</p>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-white">
//             <section
//                 style={{
//                     // backgroundImage: `url(${homeData.banners[0]})`,
//                      backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${homeData.banners[0]})`,
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                 }}
//                 className="relative w-full h-[calc(100vh-64px)]"
//             >
//                 {/* Dark Overlay */}


//                 {/* Center Content */}
//                 <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">

//                     {/* Logo */}
//                     {homeData.logo && (
//                         <img
//                             src={homeData.logo}
//                             alt="Logo"
//                             className="w-20 h-20 object-contain mb-4 rounded-full bg-white p-1 shadow-lg"
//                         />
//                     )}

//                     {/* Shop Name */}
//                     <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold drop-shadow-lg">
//                         {homeData.shopName}
//                     </h1>

//                     {/* Tagline */}
//                     {homeData.tagline && (
//                         <p className="text-blue-700 text-lg sm:text-xl mt-3 font-medium">
//                             {homeData.tagline}
//                         </p>
//                     )}

//                     {/* Description */}
//                     {homeData.description && (
//                         <p className="text-xl font-bold text-white mt-4 max-w-xl leading-relaxed">
//                             {homeData.description}
//                         </p>
//                     )}

//                     {/* Buttons */}
//                     <div className="flex flex-wrap justify-center gap-3 mt-8">
//                         {homeData.phone && (
//                             <a href={`tel:${homeData.phone}`}
//                                 className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-full text-sm font-medium transition">
//                                 📞 Call Us
//                             </a>
//                         )}
//                         {homeData.email && (
//                             <a href={`mailto:${homeData.email}`}
//                                 className="flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-800 px-5 py-3 rounded-full text-sm font-medium transition">
//                                 ✉️ Email Us
//                             </a>
//                         )}
//                         {homeData.whatsapp && (
//                             <a href={`https://wa.me/${homeData.whatsapp}`} target="_blank" rel="noreferrer"
//                                 className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full text-sm font-medium transition">
//                                 💬 WhatsApp
//                             </a>
//                         )}
//                     </div>
//                 </div>

//                 {/* Scroll Down Arrow */}
//                 <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
//                     <svg className="w-6 h-6 text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                     </svg>
//                 </div>

//             </section>

//             {/* ===== WHATSAPP FLOATING BUTTON ===== */}
//             {homeData.whatsapp && (

//                 <a href={`https://wa.me/${homeData.whatsapp}`}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 z-50"
//                 >
//                     <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
//                         <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.864L.057 23.882a.5.5 0 00.611.611l6.018-1.475A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.52-5.16-1.427l-.37-.22-3.827.938.957-3.703-.242-.382A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
//                     </svg>
//                 </a>
//             )}
//         <Product/>
//         <About/>
//         <Contact/>
//         <Location/>
//         <Footer/>
//         </div>
//     );
// };

// export default Home;
import { useEffect, useState } from "react";
import axios from "axios";
import { HOME_API } from "../../constant/constant";
import Product from "./Product";
import Location from "./Location";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";

const Home = () => {
    const [homeData, setHomeData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const res = await axios.get(`${HOME_API}`);
                setHomeData(res.data);
            } catch (error) {
                console.error("Error fetching homepage data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHomeData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!homeData) {
        return (
            <div className="flex justify-center items-center min-h-screen px-4">
                <p className="text-gray-500 text-base sm:text-lg text-center">No data found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* ===== HERO SECTION ===== */}
            <section
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${homeData.banners?.[0]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "scroll", /* avoid fixed on mobile for performance */
                }}
                className="relative w-full min-h-[calc(100vh-56px)] sm:min-h-[calc(100vh-64px)] flex flex-col justify-center items-center"
            >
                {/* Center Content */}
                <div className="flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-12 py-12 w-full max-w-3xl mx-auto">

                    {/* Logo */}
                    {homeData.logo && (
                        <img
                            src={homeData.logo}
                            alt="Logo"
                            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain mb-4 rounded-full bg-white p-1 shadow-lg"
                        />
                    )}

                    {/* Shop Name */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg leading-tight">
                        {homeData.shopName}
                    </h1>

                    {/* Tagline */}
                    {homeData.tagline && (
                        <p className="text-blue-300 text-base sm:text-lg md:text-xl mt-3 font-medium px-2">
                            {homeData.tagline}
                        </p>
                    )}

                    {/* Description */}
                    {homeData.description && (
                        <p className="text-sm sm:text-base md:text-lg font-semibold text-white/90 mt-3 max-w-xl leading-relaxed px-2">
                            {homeData.description}
                        </p>
                    )}

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 w-full px-2">
                        {homeData.phone && (
                            <a
                                href={`tel:${homeData.phone}`}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-sm font-medium transition-colors"
                            >
                                📞 <span>Call Us</span>
                            </a>
                        )}
                        {homeData.email && (
                            <a
                                href={`mailto:${homeData.email}`}
                                className="flex items-center gap-2 bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-800 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-sm font-medium transition-colors"
                            >
                                ✉️ <span>Email Us</span>
                            </a>
                        )}
                        {homeData.whatsapp && (
                            <a
                                href={`https://wa.me/${homeData.whatsapp}`}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-sm font-medium transition-colors"
                            >
                                💬 <span>WhatsApp</span>
                            </a>
                        )}
                    </div>
                </div>

                {/* Scroll Down Arrow */}
                <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
                    <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-white opacity-70"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </section>

            {/* ===== WHATSAPP FLOATING BUTTON ===== */}
            {homeData.whatsapp && (
                <a
                    href={`https://wa.me/${homeData.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Chat on WhatsApp"
                    className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white p-3 sm:p-4 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95 z-50 hidden sm:flex"
                >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.864L.057 23.882a.5.5 0 00.611.611l6.018-1.475A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.52-5.16-1.427l-.37-.22-3.827.938.957-3.703-.242-.382A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                    </svg>
                </a>
            )}

            <Product />
            <About />
            <Contact />
            <Location />
            <Footer />
        </div>
    );
};

export default Home;