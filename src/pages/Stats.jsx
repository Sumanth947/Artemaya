import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';

const Stats = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const db = getDatabase();

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribeAuth();
  }, [auth]);

  useEffect(() => {
    if (user) {
      const userId = user.uid;
      const userRef = ref(db, 'users/' + userId);

      const unsubscribeData = onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        setUserData(data);
        setLoading(false);
      });

      return () => unsubscribeData();
    }
  }, [user, db]);

  const renderValue = (value) => {
    if (typeof value === 'object' && value !== null) {
      return (
        <ul className="list-disc list-inside">
          {Object.entries(value).map(([subKey, subValue]) => (
            <li key={subKey} className="ml-4">
              <span className="font-semibold">{subKey}:</span> {renderValue(subValue)}
            </li>
          ))}
        </ul>
      );
    }
    return String(value);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 to-black text-white p-8 flex items-center justify-center">
        <div className="bg-gray-900 rounded-lg p-8 shadow-xl">
          <p className="text-xl">Please log in to view your stats.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 to-black text-white p-8 flex items-center justify-center">
        <div className="bg-gray-900 rounded-lg p-8 shadow-xl">
          <p className="text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">User Stats</h1>
        {userData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(userData).map(([key, value]) => (
              <div key={key} className="bg-gray-900 rounded-lg p-6 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105">
                <h2 className="text-2xl font-semibold mb-4 text-pink-400">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </h2>
                <div className="text-gray-300">
                  {renderValue(value)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-900 rounded-lg p-8 shadow-xl">
            <p className="text-xl text-center">No data available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;

