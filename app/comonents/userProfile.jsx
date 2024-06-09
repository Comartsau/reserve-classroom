'use client'
import { useEffect, useState } from 'react';
import liff from '@line/liff';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const initializeLiff = async () => {
      try {
        await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID });
        if (liff.isLoggedIn()) {
          const userProfile = await liff.getProfile();
          setProfile(userProfile);
        } else {
          liff.login();
        }
      } catch (error) {
        console.error('LIFF Initialization failed:', error);
      }
    };

    initializeLiff();
  }, []);

  if (!profile) {
    return <p>Loading user profile...</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>User Profile</h1>
      <div style={styles.profileContainer}>
        <img src={profile.pictureUrl} alt="User profile" style={styles.profileImage} />
        <div style={styles.profileDetails}>

          <p><strong>Name:</strong> {profile.displayName}</p>
          <p><strong>Status Message:</strong> {profile.statusMessage}</p>
          <p><strong>User ID:</strong> {profile.userId}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
    padding: '20px',
  },
  heading: {
    fontSize: '2em',
    marginBottom: '20px',
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  profileImage: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    marginBottom: '20px',
  },
  profileDetails: {
    textAlign: 'center',
  },
};

export default UserProfile;
