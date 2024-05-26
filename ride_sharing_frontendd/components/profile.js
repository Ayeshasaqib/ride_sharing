import {React,useState,useEffect} from 'react';
import { View, Text, StyleSheet, Image,LogBox } from 'react-native';
import profile from '../assets/profile.jpg'
import { Touchable } from 'react-native';
import axios from 'axios';
import IP_ADDRESS from '../config';
import { useRoute } from '@react-navigation/native';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const ProfileScreen = () => {
  const route = useRoute();
  const { email, password } = route.params || {};
  const [profileData, setProfileData] = useState(null);
  console.log(email,password)
  useEffect(() => {
    if (email && password) {
      axios.post(`http://${IP_ADDRESS}:5000/passenger/signin`, {
        email: email,
        password: password
      })
      .then(response => {
        console.log('Profile data:', response);
        setProfileData(response)
      })
      .catch(error => {
        console.log('Profile data fetch failed:', error);
      });
    }
  }, [email, password]);
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    profilePicture: profile, 
  };

  return (
    <View style={styles.container}>
      {/* Conditionally render profile data if available */}
      {profileData ? (
        <>
          <Image source={profileData.profilePicture} style={styles.profilePicture} />
          <Text style={styles.name}>{profileData.name}</Text>
          <Text style={styles.email}>{profileData.email}</Text>
          {/* ... other profile data */}
        </>
      ) : (
        <>
          <Image source={user.profilePicture} style={styles.profilePicture} />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          {/* <Touchable>
          <Text style={styles.email}>Logout</Text>
          </Touchable> */}
          {/* Add more user data here */}
        </>
      )}
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
