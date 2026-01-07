import React, { useState } from "react";
import axios from "axios";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    source: "Solar",      // ⭐ default source
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await axios.post("https://afk-solar-backend-5.onrender.com/api/contact", formData);

      setStatus("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        source: "Solar",
      });
    } catch (err) {
      console.error(err);
      setStatus("Failed to send. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#004225]">Contact Us</h1>
        <p className="text-gray-600 text-lg mt-2">
          We’re here to assist you with solar solutions and services.
        </p>
      </div>

      {/* Main Section */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 px-6">
        {/* Left Section */}
        <div className="bg-white shadow-md rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-[#004225] mb-4">
            Get In Touch
          </h2>

          <div className="flex items-start gap-4 mb-6">
            <FaMapMarkerAlt className="text-2xl text-[#004225]" />
            <p className="text-gray-700">
              Plot no 25 & 26, Padmavathi Colony Street No 10,
              <br />
              Near Prof GM Reddy Foundation,
              <br />
              Uppal, Hyderabad, Telangana, 500039
            </p>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <FaPhoneAlt className="text-2xl text-[#004225]" />
            <p className="text-gray-700">9963375533</p>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <FaEnvelope className="text-2xl text-[#004225]" />
            <p className="text-gray-700">afkecogrid@gmail.com</p>
          </div>

          <div className="flex gap-6 mt-6">
            <a href="https://maps.app.goo.gl/" target="_blank" rel="noreferrer">
              <FaMapMarkerAlt className="text-3xl text-[#004225] hover:scale-110 transition" />
            </a>

            <a
              href="https://www.instagram.com/apn_x_afk_solar_ecogrid"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram className="text-3xl text-[#004225] hover:scale-110 transition" />
            </a>

            <a
              href="https://www.facebook.com/share/16P3Kd8YKB/"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebook className="text-3xl text-[#004225] hover:scale-110 transition" />
            </a>

            <a
              href="https://www.linkedin.com/in/afk-ecogrid-442658390"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin className="text-3xl text-[#004225] hover:scale-110 transition" />
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white shadow-md rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-[#004225] mb-4">
            Send Us a Message
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <input
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Your Name"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004225]"
            />

            <input
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Your Email"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004225]"
            />

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="text"
              placeholder="Phone Number"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004225]"
            />

            <textarea
              required
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Your Message"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004225]"
            ></textarea>

            {/* Source dropdown */}
            <select
              name="source"
              value={formData.source}
              onChange={handleChange}
              disabled
              className="p-3 border rounded-lg bg-gray-100 text-gray-700"
            >
              <option value="Solar">Solar</option>
            </select>

            <button
              type="submit"
              className="bg-[#004225] text-white py-3 px-6 rounded-lg hover:bg-green-900 transition"
            >
              Send Message
            </button>

            {status && (
              <p className="text-sm mt-2 text-gray-700 font-medium">{status}</p>
            )}
          </form>
        </div>
      </div>

      {/* Google Map */}
      <div className="max-w-7xl mx-auto mt-14 px-6">
        <h2 className="text-2xl font-semibold text-[#004225] mb-4">
          Our Location
        </h2>

        <div className="w-full h-52 rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Google Map"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src="https://www.google.com/maps?q=Uppal%20Hyderabad%20Padmavathi%20Colony%20Street%2010&output=embed"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
