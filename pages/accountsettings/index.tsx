import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@watchworthy/ui';
import styles from '../profile/UserProfile.module.css'; 
import { message } from 'antd';


interface User {
  email: string;
  firstName: string;
  lastName: string;
}

const UserProfile: React.FC = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
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

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      console.error('New password and confirm new password must match.');
      message.error('New password and confirm new password must match.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8081/user/changepassword/${user.user?.id}`, {
        currentPassword,
        newPassword,
        confirmNewPassword,
      });
      console.log('Password changed successfully:', response.data);
      message.success('Password changed successfully.');
      
    } catch (error) {
      console.error('Error changing password:', error);
      
      message.error('Error changing password. Please try again.');
    }

    
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      

      <form onSubmit={handleChangePassword} className={styles.form}>
        <h2 className={styles.formTitle}>Change Password</h2>
        <label>
          Current Password:
          <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        </label>
        <label>
          New Password:
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </label>
        <label>
          Confirm New Password:
          <input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
        </label>
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default UserProfile;
