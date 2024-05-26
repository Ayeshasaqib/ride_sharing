import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Image, StyleSheet, Modal, Alert,LogBox } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import InputField from '../InputFeild';
import CustomButton from '../CustomButton';
import logoImage from '../../assets/download.jpg';
import IP_ADDRESS from '../../config';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const RegisterScreen = ({ navigation }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [categoryName, setCategoryName] = useState(null);
  const [categories, setCategories] = useState([]);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [rideName, setRideName] = useState('');
  const [numberPlate, setNumberPlate] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const handleLoginPress = () => {
    
    navigation.navigate('Driver', { screen: 'DriverLogin' })
 
};
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`http://${IP_ADDRESS}:5000/category`);
        if (response.data.categories) {
          // console.log(categories._id)
          setCategories(response.data.categories.map(category => category.name));
        } else {
          console.error('Categories data is not available');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSelect = (option) => {
    setCategoryName(option);
    setShowOptions(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!fullName) newErrors.fullName = 'Full Name is required';
    if (!email) newErrors.email = 'Email ID is required';
    if (!phoneNumber) newErrors.phoneNumber = 'Contact No is required';
    if (!password) newErrors.password = 'Password is required';
    if (!city) newErrors.city = 'City is required';
    if (!categoryName) newErrors.categoryName = 'Ride Category is required';
    if (!rideName) newErrors.rideName = 'Ride Name is required';
    if (!numberPlate) newErrors.numberPlate = 'Number Plate is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (!validateForm()) {
      return;
    }
  
    axios.post(`http://${IP_ADDRESS}:5000/driver/signup`, {
      username: fullName,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      city: city,
      rideCategory: categoryName,
      rideName: rideName,
      ridePlate: numberPlate,
    })
      .then(response => {
        const result = response.data;
        const { message, status } = result;
        
        console.log(status, message);
        setMessage(message);
        setStatus("success");
  
      })
      .catch(error => {
        setMessage('Signup Failed:');
        setStatus('FAILED');
        console.error('Signup failed:', error);
      });

  };
  
  useEffect(() => {
    if (status === 'success') {
      // Clear input fields by resetting state variables
      setFullName('');
      setEmail('');
      setPhoneNumber('');
      setPassword('');
      setCity('');
      setCategoryName(null);
      setRideName('');
      setNumberPlate('');
    }
  }, [status]);
  
  useEffect(() => {
    if (status === 'SUCCESS') 
      {
        
      route.params.setAppStateDriver('Signed up');
      console.log(appStateDriver)
      navigation.navigate('DriverData',{screen: 'Profilee',params:{email: email}});
    }
  }, [status]);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' , backgroundColor:'white'}}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: 'center', margin: 100, marginBottom: 0 }}>
          <Image source={logoImage} style={{ height: 130, width: 130 }} />
        </View>

        <Text style={{ fontSize: 28, fontWeight: '500', color: '#333', marginTop: 30, marginBottom: 30 }}>
          Register
        </Text>
        
        {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
        <InputField
          label={'Full Name'}
          value={fullName}
          onChangeText={setFullName}
          icon={<MaterialIcons name="person-outline" size={20} color="#666" style={{ marginRight: 5 }} />}
        />
      
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        <InputField
          label={'Email ID'}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          icon=
          {<MaterialIcons 
            name="alternate-email" 
            size={20} 
            color="#666" 
            style={{ marginRight: 5 }} />}
        />


        {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}
        <InputField
          label={'Contact No'}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          icon={<MaterialIcons name="call" size={20} color="#666" style={{ marginRight: 5 }} />}
        />

        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
        <InputField
          label={'Password'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          icon={<MaterialIcons name="lock" size={20} color="#666" style={{ marginRight: 5 }} />}
          inputType="password"
        />

        {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
        <InputField
          label={'City'}
          value={city}
          onChangeText={setCity}
          icon={<MaterialIcons name="location-city" size={20} color="#666" style={{ marginRight: 5 }} />}
        />

        {errors.categoryName && <Text style={styles.errorText}>{errors.categoryName}</Text>}
        <Text  style={{color: 'black', fontWeight: 'regular'}}>Ride Category</Text>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => setShowOptions(true)} style={styles.button}>
            <Text>{categoryName || 'Select Category for Rides'}</Text>
          </TouchableOpacity>


          {categories.length > 0 && (
            <Modal
              transparent={true}
              visible={showOptions}
              animationType="slide"
              onRequestClose={() => setShowOptions(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  {categories.map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={styles.option}
                      onPress={() => handleSelect(option)}
                    >
                      <Text>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </Modal>
          )}
        </View>
        

        {errors.rideName && <Text style={styles.errorText}>{errors.rideName}</Text>}
        <InputField
          label={'Ride Name'}
          value={rideName}
          onChangeText={setRideName}
          icon={<MaterialIcons name="directions-car" size={20} color="#666" style={{ marginRight: 5 }} />}
        />

       {errors.numberPlate && <Text style={styles.errorText}>{errors.numberPlate}</Text>}

        <InputField
          label={'Number Plate'}
          value={numberPlate}
          onChangeText={setNumberPlate}
          icon={<MaterialIcons name="confirmation-number" size={20} color="#666" style={{ marginRight: 5 }} />}
        />

        <CustomButton label={'Register'} onPress={handleRegister} />

        {status && (
          <Text style={[styles.statusMessage, status === 'FAILED' ? styles.errorText : styles.successText]}>
            {message}
          </Text>
        )}

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30 }}>
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={handleLoginPress}>
            <Text style={{ color: '#008000', fontWeight: '700' }}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    elevation: 5,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  errorText: {
    color: 'red',
    marginTop: 0.5,
  },
  successText: {
    color: 'green',
    marginTop: 5,
  },
  statusMessage: {
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default RegisterScreen;
