import React, { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null); // Change to null for better error handling
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactData = { name, email, message };

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/contact", { // Ensure URL is correct
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });

      if (response.ok) {
        setSuccess(true);
        setError(null); // Clear error state on success
        setName("");
        setEmail("");
        setMessage("");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error sending message");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setError("An unexpected error occurred. Please try again."); // Generic error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="p-6 md:p-8 lg:p-10 bg-white shadow-lg rounded-lg border border-gray-300 w-full sm:max-w-md">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-black text-center">
          Contact Us
        </h1>
        {success && (
          <p className="text-green-600 mb-4 text-center">
            Your message has been sent!
          </p>
        )}
        {error && (
          <p className="text-red-600 mb-4 text-center">
            {error} {/* Display specific error message */}
          </p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label className="flex flex-col text-black font-medium">
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border border-gray-300 p-3 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            />
          </label>
          <label className="flex flex-col text-black font-medium">
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 p-3 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            />
          </label>
          <label className="flex flex-col text-black font-medium">
            Message:
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="border border-gray-300 p-3 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className={`bg-emerald-600 text-white px-6 py-3 rounded transition-transform duration-300 transform hover:scale-105 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "hover:bg-emerald-700"
            }`}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
