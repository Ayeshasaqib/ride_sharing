import {React, useEffect, useState} from 'react';
import { useRoute } from '@react-navigation/native';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import logoImage from '../assets/download.jpg';
import CustomButton from './CustomButton';

const LandingSCreen = () => {
    const [press,setpress]=useState('')
    const [test,settest]=useState(false)
    const route = useRoute();
    const { appState,setAppState } = route.params || {}; // Handle undefined setAppState
    console.log(appState)
useEffect(()=>{

},[test])

const setdriver=()=>{
    setAppState('Driver')
}
const setpassenger=()=>{
    setAppState('Passenger')
}

  return (

    <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        style={{ backgroundColor: 'white' }}>

   
        <View style={{ alignItems: 'center', marginTop: 30 ,  }}>
          <Image source={logoImage} style={{ height: 150, width: 150 , margin:100, marginBottom:0}} />
        </View>
        
        <View style={{  flexDirection: 'row' , justifyContent: 'center'}}>
           <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 60, marginTop: 60, paddingHorizontal:30 }}>
            <CustomButton label={"     Driver     "} 
            onPress={setdriver}
             style={{ width: 90, paddingHorizontal: 10 }} />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 60, marginTop: 60 , paddingHorizontal:30 }}>
            <CustomButton label={"Passenger"} 
            onPress={setpassenger}
             style={{ width: 90, paddingHorizontal: 10 }} />
          </View>

        </View>
    </ScrollView>
   
  );
};

export default LandingSCreen;