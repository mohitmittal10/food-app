import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "./Register.css"; // Import the CSS file
// Save user details to Firestore
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const saveUserDetails = async (user) => {
    try {
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName || "Anonymous",
        email: user.email,
        user: "user",
        createdAt: new Date().toISOString(),
      });
      console.log("User details saved successfully!");
    } catch (error) {
      console.error("Error saving user details:", error);
    }
  };
  // In handleEmailRegister
  const handleEmailRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await saveUserDetails(user); // Save details after registration
      alert("Registration Successful!");
      navigate("/home");
    } catch (error) {
      alert(error.message);
    } 
  };

  // In handleGoogleRegister
  const handleGoogleRegister = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      await saveUserDetails(user); // Save details after registration
      alert("Registration with Google Successful!");
      navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <form className="register-form" onSubmit={handleEmailRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="register-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="register-input"
        />
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
      <button onClick={handleGoogleRegister} className="google-register-button">
        Register with Google
      </button>
      <p className="register-footer">
        Already have an account? <a href="/" className="login-link">Login</a>
      </p>
    </div>
  );
};

export default Register;
