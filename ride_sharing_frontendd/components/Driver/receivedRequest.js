import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import logoImage from '../../assets/download.jpg';
import CustomButton from '../CustomButton';
import IP_ADDRESS from '../../config';
const DriverRequestsScreen = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch booking requests from the API
    axios.get(`http://${IP_ADDRESS}:5000/bookingrequest`)
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          setRequests(response.data.data);
        } else {
          console.log('Failed to fetch booking requests:', response.data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching booking requests:', error);
      });
  }, []);

  const handleAccept = (index) => {
    console.log(`Request ${index + 1} accepted`);
    // Add your accept logic here
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      style={{ backgroundColor: 'white' }}
    >
      <View style={{ paddingHorizontal: 25, flexDirection:'row' }}>
           
           <Text style={{fontSize: 24, fontWeight: '900', color: '#333', marginBottom: 30,marginTop: 100 }}>
               Received Booking Requests
           </Text>

           <View style={{ alignItems: 'right' }}>
                <Image source={logoImage} style={{ alignItems: 'center',height: 70, width: 70 , margin:10, marginBottom:10, marginHorizontal:-55}} />
           </View>
       </View>


      <View style={{ paddingHorizontal: 25 }}>
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>Pickup Location</Text>
          <Text style={styles.headerText}>Destination</Text>
          <Text style={styles.headerText}>Fare</Text>
          <Text style={styles.headerText}>Passenger Name</Text>
          <Text style={styles.headerText}>Status</Text>
        </View>

        {requests.map((request, index) => (
          <View key={index} style={styles.dataRow}>
            <Text style={styles.dataText}>{request.pickupLoc.name}</Text>
            <Text style={styles.dataText}>{request.destination.name}</Text>
            <Text style={styles.dataText}>PKR {request.fare}</Text>
            <Text style={styles.dataText}>{request.passengerId}</Text>
            <TouchableOpacity  style={{marginLeft:1}} onPress={() => handleAccept(index)}>
           <View style={{ width: 50, height: 25, backgroundColor: '#023020',  borderRadius: 14, paddingBottom:3, paddingTop:3 }}>
          <Text style={{textAlign: 'center', fontWeight: '500',fontSize: 10,color: '#fff',
        }}>Accept</Text>
        </View>
      </TouchableOpacity>  
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    marginBottom: 10,
  },
  headerText: {
    flex: 1,
    fontWeight: '700',
    color: '#333',
    fontSize: 12,
    textAlign: 'center',
  },
  dataRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10,
    alignItems: 'center',
  },
  dataText: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default DriverRequestsScreen;
