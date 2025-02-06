import React, { useState, useEffect } from 'react';
import { auth, db } from '../components/signup/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import ProfileSection from './ProfileSection';
import OrdersSection from './OrdersSection';
import SupportSection from './SupportSection';
import "./userProfile.css"

const UserProfile = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserDetails(userDoc.data());
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
      setIsLoading(false);
    };

    fetchUserDetails();
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSection 
          userDetails={userDetails} 
          setUserDetails={setUserDetails}
        />;
      case 'orders':
        return <OrdersSection />;
      case 'support':
        return <SupportSection />;
      default:
        return <ProfileSection 
          userDetails={userDetails} 
          setUserDetails={setUserDetails}
        />;
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="user-profile-container">
      <nav className="profile-nav">
        {['profile', 'orders', 'support'].map(section => (
          <motion.button
            key={section}
            onClick={() => setActiveSection(section)}
            className={activeSection === section ? 'active' : ''}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </motion.button>
        ))}
      </nav>
      
      <main className="profile-content">
        {renderSection()}
      </main>
    </div>
  );
};

export default UserProfile;