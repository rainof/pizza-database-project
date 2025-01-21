import React, { useState } from "react";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    addr_1: "",
    addr_2: "",
    city: "",
    zipcode: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/customers/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          password: formData.password,
          addr_1: formData.addr_1,
          addr_2: formData.addr_2,
          city: formData.city,
          zipcode: formData.zipcode,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");

      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => (window.location.href = "/login"), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <form onSubmit={handleSubmit}>
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleChange}
            required
            className="w-full sm:w-[48%] p-2 border rounded"
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleChange}
            required
            className="w-full sm:w-[48%] p-2 border rounded"
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border mb-4 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-2 border mb-4 rounded"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="w-full p-2 border mb-8 rounded"
        />

        <h3 className="text-lg font-semibold mb-2">Address Information</h3>
        <input
          type="text"
          name="addr_1"
          placeholder="Address Line 1"
          value={formData.addr_1}
          onChange={handleChange}
          required
          className="w-full p-2 border mb-4 rounded"
        />
        <input
          type="text"
          name="addr_2"
          placeholder="Address Line 2 (Optional)"
          value={formData.addr_2}
          onChange={handleChange}
          className="w-full p-2 border mb-4 rounded"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
          className="w-full p-2 border mb-4 rounded"
        />
        <input
          type="text"
          name="zipcode"
          placeholder="Zipcode"
          value={formData.zipcode}
          onChange={handleChange}
          required
          className="w-full p-2 border mb-4 rounded"
        />

        <button
          type="submit"
          className="w-full bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
