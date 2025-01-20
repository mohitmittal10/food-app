import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from './components/signup/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './components/signup/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, "users", firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              role: userDoc.data().role,
              isAuthenticated: userDoc.data().isAuthenticated
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        await updateDoc(userDocRef, {
          isAuthenticated: false,
          lastLogout: new Date().toISOString()
        });
      }
      await signOut(auth);
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const value = {
    user,
    handleLogout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};