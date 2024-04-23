import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';
import IP_ADDRESS from './config'
const fetchData = async () => {
  try {
    // User.find({}, (err, users) => {
    //   if (err) {
    //     console.error('Error fetching users:', err);
    //     return;
    //   }
    //   console.log('Users:', users);
    // });
    
    const response = await axios.get(`http://${IP_ADDRESS}:5000/passenger/`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return 'Error fetching data';
  }
};

const App = () => {
  const [data, setData] = useState('No data yet');

  useEffect(() => {
    console.log('before settiung')
    fetchData().then(setData);
    console.log(data)
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>


    <Button title="Fetch Data" onPress={() => fetchData().then(setData)} />
    </View>
  );
};

export default App;
