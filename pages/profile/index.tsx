import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@watchworthy/ui';
import styles from './UserProfile.module.css'; 

interface User {
  email: string;
  firstName: string;
  lastName: string;
}

const UserProfile: React.FC = () => {
  const [profile, setProfile] = useState<User | null>(null);
  
  const user = useUser();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const usernameValue = user.user?.username; 
        if (usernameValue) {
          const response = await axios.get<User>(`http://localhost:8081/user/profile/${usernameValue}`);
          setProfile(response.data);
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchProfile();
  }, [user.user]);

  

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>User Profile</h1>
      <p className={styles.info}>Email: {profile.email}</p>
      <p className={styles.info}>First Name: {profile.firstName}</p>
      <p className={styles.info}>Last Name: {profile.lastName}</p>

     
    </div>
  );
};

export default UserProfile;
