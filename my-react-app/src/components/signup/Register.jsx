import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./firebaseConfig"; // Import Firebase config
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "./Register.css"; // Import CSS styles
import { motion } from "framer-motion";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const saveUserDetails = async (user) => {
    try {
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: user.email,
        address: address,
        contact: contact,
        role: "user", // Default role
        createdAt: new Date().toISOString(),
        emailVerified: user.emailVerified || false,
      });
      console.log("User details saved successfully!");
    } catch (err) {
      console.error("Error saving user details:", err);
      setError("Failed to save user details. Please try again.");
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!name || !address || !contact) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await sendEmailVerification(user);
      
      await setDoc(doc(db, "users", user.uid), {
        name,
        email: user.email,
        address,
        contact,
        role: "user",
        createdAt: new Date().toISOString(),
        emailVerified: user.emailVerified || false,
      });

      alert("Registration successful! Please verify your email before logging in.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="register-container"
    >
      <motion.div
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className="register-form-container bg-white rounded-lg shadow-lg p-8"
      >
        <motion.h2 variants={inputVariants} className="text-3xl font-bold text-center mb-8">
          Register
        </motion.h2>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="error-message text-red-500 text-center mb-4"
          >
            {error}
          </motion.div>
        )}

        <motion.form 
          variants={formVariants}
          onSubmit={handleRegister}
          className="space-y-6"
        >
          <motion.input
            variants={inputVariants}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
          />
          <motion.input
            variants={inputVariants}
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
          />
          <motion.input
            variants={inputVariants}
            type="text"
            placeholder="Contact Number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
          />
          <motion.input
            variants={inputVariants}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
          />
          <motion.input
            variants={inputVariants}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
          />

          <motion.button
            variants={inputVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {loading ? "Registering..." : "Register"}
          </motion.button>
        </motion.form>

        <motion.p variants={inputVariants} className="mt-6 text-center">
          Already have an account?{" "}
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="/login"
            className="text-blue-600 hover:text-blue-700"
          >
            Login
          </motion.a>
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default Register;
