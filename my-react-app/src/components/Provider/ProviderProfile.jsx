import React, { useEffect, useState } from "react";
import { auth, db } from "../signup/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const ProviderProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "providers", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Provider Profile</h2>
      <p><strong>Owner Name:</strong> {profile.ownerName}</p>
      <p><strong>Kitchen Name:</strong> {profile.kitchenName}</p>
      <p><strong>Contact:</strong> {profile.contact}</p>
      <p><strong>Address:</strong> {profile.address}</p>
      <p><strong>Email:</strong> {profile.email}</p>
    </div>
  );
};

export default ProviderProfile;
