// import React, { useEffect, useState } from "react";
// import { doc, getDoc } from "firebase/firestore"; // Firestore for additional details
// import { auth, db } from "./firebaseConfig"; // Ensure to import your Firestore config
// import "../styles/Profile.css";

// const Profile = ({ user }) => {
//   const [customDetails, setCustomDetails] = useState(null);

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       if (user) {
//         try {
//           const userDoc = await getDoc(doc(db, "users", user.uid)); // Replace "users" with your Firestore collection
//           if (userDoc.exists()) {
//             setCustomDetails(userDoc.data());
//           } else {
//             console.log("No custom details found for the user.");
//           }
//         } catch (error) {
//           console.error("Error fetching user details:", error);
//         }
//       }
//     };

//     fetchUserDetails();
//   }, [user]);

//   return (
//     <div className="profile-container">
//       <h2>Your Profile</h2>
//       <div className="profile-card">
//         <p><strong>Name:</strong> {user.name}</p>
//         <p><strong>Email:</strong> {user.email}</p>
//         {user.photoURL && (
//           <div>
//             <img
//               src={user.photoURL}
//               alt="Profile"
//               className="profile-picture"
//             />
//           </div>
//         )}
//         <p><strong>Phone:</strong> {user.phoneNumber || "N/A"}</p>
//         <p><strong>Account Created On:</strong> {user.metadata.creationTime}</p>
//         <p><strong>Last Login:</strong> {user.metadata.lastSignInTime}</p>

//         {customDetails && (
//           <>
//             <p><strong>Address:</strong> {customDetails.address || "N/A"}</p>
//             <p><strong>Date of Birth:</strong> {customDetails.dob || "N/A"}</p>
//             <p><strong>Preferences:</strong> {customDetails.preferences || "N/A"}</p>
//             <p><strong>Loyalty Points:</strong> {customDetails.loyaltyPoints || "0"}</p>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "./signup/firebaseConfig";
import "../styles/Profile.css"; // Add styles if needed

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserDetails(userDoc.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserDetails();
  }, []);

  if (!userDetails) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <p><strong>Name:</strong> {userDetails.name}</p>
      <p><strong>Email:</strong> {userDetails.email}</p>
      <p><strong>Account Created:</strong> {userDetails.createdAt}</p>
    </div>
  );
};

export default Profile;
