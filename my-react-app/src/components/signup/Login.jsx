import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./firebaseConfig";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unverifiedUser, setUnverifiedUser] = useState(null); // Store unverified user
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          navigate("/home");
        } else {
          setUnverifiedUser(user); // Save the user for resend verification
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const saveUserDetails = async (user, isGoogleLogin = false) => {
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // New user
        await setDoc(userDocRef, {
          name: user.displayName || "Anonymous",
          email: user.email,
          createdAt: new Date().toISOString(),
          isAuthenticated: true,
          lastLogin: new Date().toISOString(),
          role: "user", // Default role
        });
      } else {
        // Existing user - update authentication status
        await updateDoc(userDocRef, {
          isAuthenticated: true,
          lastLogin: new Date().toISOString(),
        });
      }
      console.log("User details saved successfully!");
    } catch (err) {
      console.error("Error saving user details:", err);
      setError("Failed to save user details. Please try again.");
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        setUnverifiedUser(user);
        setLoading(false);
        alert("Please verify your email address before logging in.");
        return;
      }

      await saveUserDetails(user);
      alert("Login Successful!");
      navigate("/home");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      await saveUserDetails(user, true);
      alert("Login with Google Successful!");
      navigate("/home");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Resend verification email
  const resendVerificationEmail = async () => {
    if (!unverifiedUser) return;
    try {
      await sendEmailVerification(unverifiedUser);
      alert("Verification email resent successfully! Please check your inbox.");
    } catch (err) {
      console.error("Error resending verification email:", err);
      alert("Failed to resend verification email.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      {error && <p className="error-message">{error}</p>} {/* Display error */}
      <form className="login-form" onSubmit={handleEmailLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
          disabled={loading} // Disable while loading
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
          disabled={loading} // Disable while loading
        />
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <button
        onClick={handleGoogleLogin}
        className="google-login-button"
        disabled={loading}
      >
        {loading ? "Please wait..." : "Login with Google"}
      </button>

      {/* Resend verification email button */}
      {unverifiedUser && (
        <div className="verification-section">
          <p className="unverified-message">
            Your email is not verified. Please verify your email to log in.
          </p>
          <button
            onClick={resendVerificationEmail}
            className="resend-verification-button"
            disabled={loading}
          >
            Resend Verification Email
          </button>
        </div>
      )}

      <p className="login-footer">
        Don't have an account?{" "}
        <a href="/register" className="register-link">
          Register
        </a>
      </p>
    </div>
  );
};

export default Login;
