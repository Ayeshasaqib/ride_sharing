import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import profile from '../assets/profile.jpg'
const ProfileScreen = ({naviagtion}) => {
  // Dummy user data (replace with actual user data)
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    profilePicture: profile, // Example image path
    // Add more user data as needed
  };

  return (
    <View style={styles.container}>
      <Image source={user.profilePicture} style={styles.profilePicture} />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      {/* Add more user data here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75, // Half of width and height to create a circular image
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    color: '#666',
  },
  // Add more styles for additional user data if needed
});

export default ProfileScreen;
