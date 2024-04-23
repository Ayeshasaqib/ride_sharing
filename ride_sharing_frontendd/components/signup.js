import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

//import DatePicker from 'react-native-date-picker';
import InputField from './InputFeild';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from './CustomButton';
import logoImage from '../assets/download.jpg';
import axios from 'axios';
import IP_ADDRESS from '../config';

const RegisterScreen = ({navigation}) => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setusername] = useState('');
  const [contact, setcontact] = useState('');
  const [messagee, setmessagee] = useState('');
  const [statuss, setstatuss] = useState('');
  const handlesignup =()=>{
    
      console.log(email, password)
      axios.post( `http://${IP_ADDRESS}:5000/passenger/signup`, {
        username:username,
        email: email,
        phoneNumber:contact,
        password: password,

      })
      .then(response => {
        
        const result=response.data
        const {message, status,data} =result;
        
        console.log(status,message)
        if (status !=='SUCCESS')
        { 
          setmessagee(message)
          setstatuss(status)
        }
        else{
          ()=>navigation.navigate('Profile')
        }
      })
      .catch(error => {
        console.error('signup failed:', error);
      });
    }
  
  

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 25}}>
        
        <View style={{alignItems: 'center', margin:100, marginBottom:0}}>
            {/* Using an Image component instead of SVG */}
            <Image
              source={logoImage}
              style={{height: 130, width: 130}}
            />
          </View>
        
        <Text
          style={{
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginTop: 30, // Adjusted for removed SVG
            marginBottom: 30,
          }}>
          Register
        </Text>


        <InputField
          label={'Full Name'}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          value={username}
          onChangeText={setusername}
        />


        <InputField
          label={'Email ID'}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          keyboardType="email-address"
          value={email}
          onChangeText={setemail}
        />

          <InputField
          label={'Contact No'}
          icon={
            <MaterialIcons
              name="call"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          value={contact}
          onChangeText={setcontact}
        />


        <InputField
          label={'Password'}
          icon={
            <MaterialIcons
              name="lock"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          inputType="password"
          value={password}
          onChangeText={setPassword}
        />
          <Text style={{ color:'red',  justifyContent: 'center',marginLeft:70, marginBottom: 10, marginTop: 10 }}> 
            {statuss}: {messagee}
          </Text>

        <CustomButton label={'Register'} onPress={handlesignup} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={()=>navigation.navigate('Login' )}>
            <Text style={{color: '#008000', fontWeight: '700'}}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
