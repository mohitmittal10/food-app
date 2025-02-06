import React, { useState } from 'react';
import { auth, db } from '../components/signup/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion } from 'framer-motion';

const SupportSection = () => {
  const [supportData, setSupportData] = useState({
    subject: '',
    message: '',
    priority: 'medium'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupportData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    try {
      await addDoc(collection(db, 'support_tickets'), {
        userId: user.uid,
        userEmail: user.email,
        ...supportData,
        status: 'open',
        createdAt: serverTimestamp()
      });

      alert('Support ticket submitted successfully!');
      setSupportData({
        subject: '',
        message: '',
        priority: 'medium'
      });
    } catch (error) {
      console.error('Error submitting support ticket:', error);
      alert('Failed to submit support ticket');
    }
  };

  return (
    <div className="support-section">
      <h2>Customer Support</h2>
      <form onSubmit={handleSubmit} className="support-form">
        <div className="form-group">
          <label>Subject</label>
          <input
            type="text"
            name="subject"
            value={supportData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Priority</label>
          <select
            name="priority"
            value={supportData.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea
            name="message"
            value={supportData.message}
            onChange={handleChange}
            required
          />
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit Support Ticket
        </motion.button>
      </form>
    </div>
  );
};

export default SupportSection;