import React from 'react';
import Input from '../forms/Input';
import Button from '../common/Button';

const ProfileTab = ({ userProfile, onProfileUpdate }) => {
  const handleSubmit = e => {
    e.preventDefault();
    onProfileUpdate && onProfileUpdate(userProfile);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Full Name" id="fullName" value={userProfile.fullName} readOnly />
      <Input label="Email" id="email" type="email" value={userProfile.email} readOnly />
      <Button type="submit">Update</Button>
    </form>
  );
};

export default ProfileTab;
