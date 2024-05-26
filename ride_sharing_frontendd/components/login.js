import {React, useEffect, useState} from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  TouchableOpacity,
  Image,
   LogBox 
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import logoImage from '../assets/download.jpg';
import CustomButton from './CustomButton';
import InputField from './InputFeild';
import axios from 'axios';
import IP_ADDRESS from '../config';
import { useRoute } from '@react-navigation/native';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
const LoginScreen = () => {
  const route = useRoute();
  //const { setAppStatePassenger ,appStatePassenger} = route.params || {}; 
  //console.log(route.params.appStatePassenger)
  const navigation = route.params.navigation;
  const [test, settest] = useState(false);
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [messagee, setmessagee] = useState('');
  const [statuss, setstatuss] = useState('');
  const [dataa, setdataa] = useState('');
 
  useEffect(() => {
    if (statuss === 'SUCCESS') {
      route.params.setAppStatePassenger('Logined');
      navigation.navigate('PassengerData', {
        screen: 'Profilee',
        params: { email: email, password: password }
      });
    }
  }, [statuss, email, password, navigation]);
  
  const handlelogin =()=>{
    console.log(email,password)
      axios.post( `http://${IP_ADDRESS}:5000/passenger/signin`, {
        email: email,
        password: password
      })
      .then(response => {
        
        const result=response.data
        const {message, status,data} =result;
        console.log(status,message,data)
        setmessagee(message)
        setstatuss(status)
        setdataa(data)
      })
      .catch(error => {
        setmessagee('Login Failed:')
        setstatuss('FAILED')
        console.log('Login failed:', error);
      });
    }
  const handleRegisterPress = () => {
      navigation.navigate('Passenger', { screen: 'Register' })
    };
  
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.select({ ios: 100, android: 100 })}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        style={{ backgroundColor: 'white' }}
      >
      
        <View style={{ alignItems: 'center', marginTop: 30 }}>
          <Image source={logoImage} style={{ height: 150, width: 150 , margin:100, marginBottom:0}} />
        </View>
       
        <View style={{ paddingHorizontal: 25 }}>
          <Text style={{ fontSize: 28, fontWeight: '500', color: '#333', marginBottom: 30 }}>
            Login
          </Text>

          <InputField
            label={'Email ID'}
            icon={
              <MaterialIcons
                name="alternate-email"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            keyboardType="email-address"
            value={email}
            onChangeText={setemail}
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
            fieldButtonLabel={"Forgot?"}
            value={password}
            onChangeText={setPassword}
          />
          <Text style={{ color:'red',  justifyContent: 'center',marginLeft:10, marginBottom: 10, marginTop: 10 }}> 
            {statuss} : {messagee}
          </Text>
          <CustomButton label={"Login"} onPress={handlelogin }/>

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30, marginTop: 30 }}>
            <Text>New to the app?</Text>
            <TouchableOpacity onPress={handleRegisterPress}>
              <Text style={{ color: '#023020', fontWeight: '700', marginLeft: 5 }}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
