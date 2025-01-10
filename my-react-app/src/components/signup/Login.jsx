import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import "./Login.css"; // Import the CSS file
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Ensure correct import of Firestore
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home"); // Redirect to home if already logged in
      }
    });

    return () => unsubscribe(); // Clean up listener
  }, [navigate]);
  const saveUserDetails = async (user) => {
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
  
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          name: user.displayName || "Anonymous",
          email: user.email,
          createdAt: new Date().toISOString(),
        });
        console.log("User details saved successfully!");
      }
    } catch (error) {
      console.error("Error saving user details:", error);
    }
  };
  // In handleEmailLogin
const handleEmailLogin = async (e) => {
  e.preventDefault();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await saveUserDetails(user); // Save details after login
    alert("Login Successful!");
    navigate("/home");
  } catch (error) {
    alert(error.message);
  }
};

  // In handleGoogleLogin
const handleGoogleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    await saveUserDetails(user); // Save details after login
    alert("Login with Google Successful!");
    navigate("/home");
  } catch (error) {
    alert(error.message);
  }
};

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleEmailLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <button onClick={handleGoogleLogin} className="google-login-button">
        Login with Google
      </button>
      <p className="login-footer">
        Don't have an account? <a href="/register" className="register-link">Register</a>
      </p>
    </div>
  );
};

export default Login;
