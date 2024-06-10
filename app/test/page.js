import { AppBar } from '@mui/material';
import Image from 'next/image';
import React from 'react'

function Test() {
    return (
        <div style={styles.container}>
            <AppBar className='flex  bg-red-500 justify-items-center'>
            <Image
              src="/15.jpg"
              alt="User profile"
              style={styles.profileImage}
              width={20}
              height={20}
            />

            </AppBar>
             <h1 style={styles.heading}>User Profile</h1>
          <div style={styles.profileContainer}>
       
            <div style={styles.profileDetails}>
              <p>
                {/* <strong>Name:</strong> {profile.displayName} */}
              </p>
              <p>
                {/* <strong>Status Message:</strong> {profile.statusMessage} */}
              </p>
              <p>
                {/* <strong>User ID:</strong> {profile.userId} */}
              </p>
            </div>
          </div>
        </div>
      );
    };
    
    const styles = {
      container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
        padding: "20px",
      },
      heading: {
        fontSize: "2em",
        marginBottom: "10px",
      },
      profileContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      },
      profileImage: {
        width: "150px",
        height: "150px",
        borderRadius: "50%",
        marginBottom: "20px",
      },
      profileDetails: {
        textAlign: "center",
      },
    };

export default Test