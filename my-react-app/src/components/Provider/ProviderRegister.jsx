import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import { auth } from "../signup/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore();

const ProviderRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [kitchenName, setKitchenName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save provider details in both collections
      await Promise.all([
        // Save in users collection for authentication
        setDoc(doc(db, "users", user.uid), {
          email,
          role: "provider",
        }),
        // Save detailed info in providers collection
        setDoc(doc(db, "providers", user.uid), {
          ownerName,
          kitchenName,
          contact,
          address,
          email,
          role: "provider",
        })
      ]);

      alert("Provider registered successfully!");
      navigate("/provider/login")
    } catch (error) {
      alert("Error registering provider: " + error.message);
    }
  };

  return (
    <form onSubmit={handleRegister} className="max-w-md mx-auto p-4">
      <input
        type="text"
        placeholder="Owner Name"
        value={ownerName}
        onChange={(e) => setOwnerName(e.target.value)}
        required
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Kitchen Name"
        value={kitchenName}
        onChange={(e) => setKitchenName(e.target.value)}
        required
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="tel"
        placeholder="Contact Number"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        required
        className="w-full mb-2 p-2 border rounded"
      />
      <textarea
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
        className="w-full mb-2 p-2 border rounded"
      />
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
        Register as Provider
      </button>
    </form>
  );
};

export default ProviderRegister;