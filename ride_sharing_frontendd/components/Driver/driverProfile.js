
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';
import IP_ADDRESS from '../../config';

const DriverProfileScreen = ({ route }) => {
  const { email } = route.params;
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://${IP_ADDRESS}:5000/driver/${email}`)
      .then(response => {
        setDriver(response.data.driver);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching driver:', error);
        setLoading(false);
      });
  }, [email]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!driver) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Driver not found</Text>
      </View>
    );
  }

  return (

    <ScrollView style={{backgroundColor:'#023020'}}>
          <Text style={styles.name}> {driver.username}</Text>
            <View style= {{flexDirection:'row',borderWidth: 0.5, borderColor: '#023020',  margin:8, borderCurve:1, borderRadius: 15, backgroundColor:"white"}} >
           
                    <View>
                        <Text style={styles.textColor}>Email:</Text>
                        <Text style={styles.textColor}>Phone:</Text>
                        <Text style={styles.textColor}>City:</Text>
                        <Text style={styles.textColor}>Ride Category:</Text>
                        <Text style={styles.textColor}>Ride Name:</Text>
                        <Text style={styles.textColor}>Ride Plate:</Text>
                    </View>
                    <View>
                    
                        <Text style={styles.email}>{driver.email}</Text>
                        <Text style={styles.email}>{driver.phoneNumber}</Text>
                        <Text style={styles.email}>{driver.city}</Text>
                        <Text style={styles.email}>{driver.rideCategory}</Text>
                        <Text style={styles.email}>{driver.rideName}</Text>
                        <Text style={styles.email}>{driver.ridePlate}</Text>
                    </View>
            </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
    container: {
      flexDirection:'row',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center', 
      backgroundColor:"white"
    },

    textColor:{
        paddingTop:20,
        paddingBottom:20,
        paddingLeft:5,
        fontSize: 17,
        color: '#023020', 
        fontWeight:'regular'

    },
   
    name: {
      fontSize: 24,
      fontWeight: '700',
      marginBottom: 10,
      color:"white",
    //   alignItems:'center',
      paddingStart:0,
      marginTop:150,
      marginLeft:50,
      marginRight:50,
      paddingLeft:65
      
    },
    email: {
      fontSize: 17,
      fontWeight: '200',
      color: '#023020',
      paddingLeft:1,
      paddingRight: 1,
      marginHorizontal:10,
      paddingTop:20,
      paddingBottom:20
    },
  });
  
export default DriverProfileScreen;