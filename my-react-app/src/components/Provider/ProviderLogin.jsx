import React, { useState } from "react";
import { auth } from "../signup/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const db = getFirestore();

const ProviderLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check role in users collection
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists() && userDoc.data().role === "provider") {
        // Update user document with authentication status
        await updateDoc(userDocRef, {
          isAuthenticated: true,
          lastLogin: new Date().toISOString()
        });
        
        alert("Provider logged in successfully!");
        navigate("/provider/profile");
      } else {
        alert("You are not authorized to log in as a provider.");
        await auth.signOut();
        navigate("/provider/login");
      }
    } catch (error) {
      alert("Error logging in: " + error.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto p-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full mb-2 p-2 border rounded"
      />
      <button 
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Login as Provider
      </button>
    </form>
  );
};

export default ProviderLogin;