// frontend/src/components/layout/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="w-full mt-auto">
            {/* Full-width linear bar */}
            <div className="w-full h-2 bg-linear-to-r from-teal-500 via-cyan-500 to-teal-600" />

            <div
                className="w-full flex flex-col lg:flex-row gap-12 lg:gap-20 justify-between text-slate-600 py-8 px-6 lg:px-12 xl:px-24"
                style={{
                    background: "linear-linear(to top, #d4f4ff 0%, #e6f8ff 70%, #f8fdff 100%)",
                }}
            >
                {/* Brand & Description */}
                <div className="lg:w-1/3">
                    <Link to="/" className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-linear-to-r from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl mr-4">
                            <span className="text-xl font-bold text-white">HC</span>
                        </div>
                        <span className="text-2xl font-bold text-slate-800">HospitalCare</span>
                    </Link>
                    <p className="text-slate-600 leading-relaxed mb-8 max-w-md">
                        Providing world-class healthcare with compassion, expertise, and advanced technology.
                    </p>

                    {/* Social Icons - Fixed Links */}
                    <div className="flex gap-4">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/50 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-teal-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                                <path d="M20.445 5h-8.891A6.559 6.559 0 0 0 5 11.554v8.891A6.559 6.559 0 0 0 11.554 27h8.891a6.56 6.56 0 0 0 6.554-6.555v-8.891A6.557 6.557 0 0 0 20.445 5zm4.342 15.445a4.343 4.343 0 0 1-4.342 4.342h-8.891a4.341 4.341 0 0 1-4.341-4.342v-8.891a4.34 4.34 0 0 1 4.341-4.341h8.891a4.342 4.342 0 0 1 4.341 4.341l.001 8.891z" />
                                <path d="M16 10.312c-3.138 0-5.688 2.551-5.688 5.688s2.551 5.688 5.688 5.688 5.688-2.551 5.688-5.688-2.55-5.688-5.688-5.688zm0 9.163a3.475 3.475 0 1 1-.001-6.95 3.475 3.475 0 0 1 .001 6.95zM21.7 8.991a1.363 1.363 0 1 1-1.364 1.364c0-.752.51-1.364 1.364-1.364z" />
                            </svg>
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/50 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-teal-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                            </svg>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/50 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-teal-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                                <path d="M22.23 0H1.77C.79 0 0 .774 0 1.728v20.543C0 23.226.79 24 1.77 24h20.46C23.21 24 24 23.226 24 22.271V1.728C24 .774 23.21 0 22.23 0zM7.12 20.452H3.56V9h3.56v11.452zM5.34 7.432a2.065 2.065 0 1 1 0-4.13 2.065 2.065 0 0 1 0 4.13zm15.112 13.02h-3.555v-5.565c0-1.327-.025-3.033-1.848-3.033-1.85 0-2.133 1.445-2.133 2.938v5.66h-3.555V9h3.414v1.561h.049c.476-.9 1.637-1.847 3.367-1.847 3.6 0 4.265 2.367 4.265 5.444v6.294z" />
                            </svg>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/50 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-teal-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="w-6 h-6 fill-current"
                            >
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <nav className="lg:w-1/4">
                    <h6 className="text-xl font-bold text-slate-800 mb-6 underline underline-offset-4 decoration-teal-500 cursor-pointer hover:text-teal-600">
                        Quick Links
                    </h6>
                    <ul className="space-y-3">
                        <li><Link to="/" className="text-slate-600 hover:text-teal-600 hover:underline font-medium transition-all duration-300 block">Home</Link></li>
                        <li><Link to="/about" className="text-slate-600 hover:text-teal-600 hover:underline font-medium transition-all duration-300 block">About Us</Link></li>
                        <li><Link to="/doctors" className="text-slate-600 hover:text-teal-600 hover:underline font-medium transition-all duration-300 block">Our Doctors</Link></li>
                        <li><Link to="/services/departments" className="text-slate-600 hover:text-teal-600 hover:underline font-medium transition-all duration-300 block">Departments</Link></li>
                    </ul>
                </nav>

                {/* Services */}
                <nav className="lg:w-1/4">
                    <h6 className="text-xl font-bold text-slate-800 mb-6 underline underline-offset-4 decoration-teal-500 cursor-pointer hover:text-teal-600">
                        Services
                    </h6>
                    <ul className="space-y-3">
                        <li><Link to="/services/list" className="text-slate-600 hover:text-teal-600 hover:underline font-medium transition-all duration-300 block">All Services</Link></li>
                        <li><Link to="/services/departments" className="text-slate-600 hover:text-teal-600 hover:underline font-medium transition-all duration-300 block">Departments</Link></li>
                        <li><Link to="/services/diagnostics" className="text-slate-600 hover:text-teal-600 hover:underline font-medium transition-all duration-300 block">Diagnostics</Link></li>
                        <li><Link to="/services/patientCare" className="text-slate-600 hover:text-teal-600 hover:underline font-medium transition-all duration-300 block">Patient Care</Link></li>
                    </ul>
                </nav>

                {/* Contact */}
                <div className="lg:w-1/4">
                    <h6 className="text-xl font-bold text-slate-800 mb-6 underline underline-offset-4 decoration-teal-500 cursor-pointer hover:text-teal-600">
                        Contact Us
                    </h6>
                    <p className="text-slate-600 mb-4">Kalyan, Maharashtra</p>
                    <p className="text-lg font-semibold text-teal-600 mb-2">+91 022 6884 6141</p>
                    <a href="mailto:info@hospitalcare.com" className="text-slate-600 hover:text-teal-600 hover:underline font-medium block mb-6">
                        info@hospitalcare.com
                    </a>
                    <div className="text-xs text-slate-500">
                        <p>24/7 Emergency</p>
                        <p>OPD: 9 AM - 9 PM</p>
                    </div>
                </div>
            </div>

            {/* Copyright - Full width */}
            <div className="w-full bg-linear-to-r from-slate-800 to-slate-900 text-white py-6 text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} HospitalCare. All rights reserved. | Kalyan, Maharashtra
                </p>
            </div>
        </footer>
    );
};

export default Footer;