import React, { useState } from 'react';
import { auth, db } from '../components/signup/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';

const ProfileSection = ({ userDetails, setUserDetails }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userDetails || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, formData);
      
      setUserDetails(formData);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="profile-section">
      <h2>My Profile</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="profile-edit-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              disabled
            />
          </div>
          <div className="form-group">
            <label>contact Number</label>
            <input
              type="tel"
              name="contact"
              value={formData.contact || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-actions">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Save Profile
            </motion.button>
            <motion.button
              type="button"
              onClick={() => setIsEditing(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
          </div>
        </form>
      ) : (
        <div className="profile-display">
          <div className="profile-info">
            <p><strong>Name:</strong> {userDetails?.name || 'Not provided'}</p>
            <p><strong>Email:</strong> {userDetails?.email}</p>
            <p><strong>contact:</strong> {userDetails?.contact || 'Not provided'}</p>
            <p><strong>Address:</strong> {userDetails?.address || 'Not provided'}</p>
          </div>
          <motion.button
            onClick={() => setIsEditing(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Edit Profile
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;