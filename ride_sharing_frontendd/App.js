import { StatusBar } from 'expo-status-bar';
import {React, useEffect, useState} from 'react';
import { StyleSheet, Text, View , LogBox } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

import LoginScreen from './components/login';
import RegisterScreen from './components/signup';
import ProfileScreen from './components/profile';
import BookingScreen from './components/booking';
import LocationSearchPage from './components/Search_location';
import LandingScreen from './components/landing';
import DriverLoginScreen from './components/Driver/driverLogin'
import DriverProfileScreen from './components/Driver/driverProfile'
import DriverRegisterScreen from './components/Driver/driverSignup1'
import DriverRequestsScreen from './components/Driver/receivedRequest'
import LoadingScreen from './components/Loading'



LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
const AppStack = createStackNavigator();
const StartStack = createStackNavigator();


// const StartStackScreen = ({ navigation, appState, setAppState }) => (
//   <startStack.Navigator>
//     <startStack.Screen name="Landing" component={LandingSCreen} options={{ headerShown: false, }} initialParams={{ navigation, appState, setAppState }} />
//    {/* Conditionally render screens based on userType in appState */}
//    {appState ? (appState.userType === 'Passenger' && (
//       <>
//       <AppStack.Screen name="Passenger" component={StartPessengerStackScreen} options={{ headerShown: false, }} />
//       <AppStack.Screen name="PassengerData" component={StartPessengerDrawerScreen} options={{ headerShown: false, }} />
       
//       </>
//       ) : (
//     appState.userType === 'Driver' && (
//       <>
//       <startStack.Screen name="Driver" component={StartDriverStackScreen} options={{ headerShown: false, }} />
//       <startStack.Screen name="DriverData" component={StartDriverDrawerScreen} options={{ headerShown: false, }} /> 
//       </>
//         ) 
//     )}
//   </startStack.Navigator>
// );

// const StartStackScreen = ({ navigation, appState, setAppState,appStatePassenger, setAppStatePassenger,appStateDriver, setAppStateDriver  }) => {
// console.log(appState)

//   return (
 

// );}

const startPessengerDrawer =createDrawerNavigator();
const StartPessengerDrawerScreen = ({ navigation }) => (
  <startPessengerDrawer.Navigator>
    <startPessengerDrawer.Screen name="Profilee" component={ProfileScreen} />
    <startPessengerDrawer.Screen name="Booking" component={SecondStackScreenPassenger}  />  
  </startPessengerDrawer.Navigator>
);

const startPessengerStack =createStackNavigator();

const StartPessengerStackScreen = ({ navigation, route }) => {
  const { appStatePassenger, setAppStatePassenger } = route.params;
  //console.log(route.params.appStatePassenger);  // should log the correct value
  return (
  <startPessengerStack.Navigator>
    <startPessengerStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, }} initialParams={{ navigation ,appStatePassenger, setAppStatePassenger}} />
    <startPessengerStack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} initialParams={{ navigation ,appStatePassenger, setAppStatePassenger}} />
  </startPessengerStack.Navigator>
);}

const startDriverDrawer = createDrawerNavigator();
const StartDriverDrawerScreen = ({ navigation }) => (
  <startDriverDrawer.Navigator>
     <startDriverStack.Screen name="Profilee" component={DriverProfileScreen} initialParams={{email,password}} />
    <startDriverStack.Screen name="Requests" component={DriverRequestsScreen}  />
  </startDriverDrawer.Navigator>
);


const startDriverStack = createStackNavigator();
const StartDriverStackScreen = ({ navigation,appStateDriver ,setAppStateDriver}) => { 
  console.log(appStateDriver)
  return (
  <startDriverStack.Navigator>
     <startDriverDrawer.Screen name="DriverLogin" component={DriverLoginScreen} options={{ headerShown: false, }} initialParams={{ navigation ,appStateDriver ,setAppStateDriver}} />
     <startDriverDrawer.Screen name="DriverRegister" component={DriverRegisterScreen} options={{ headerShown: false }} initialParams={{ navigation ,appStateDriver ,setAppStateDriver}} />
    </startDriverStack.Navigator>
);
}
const SecondStack = createStackNavigator();
const SecondStackScreenPassenger = ({ navigation }) => (
  <SecondStack.Navigator>
    <SecondStack.Screen name="Booking" component={BookingScreen} options={{ headerShown: false }} />
    <SecondStack.Screen name="Location" component={LocationSearchPage} options={{ headerShown: false }} />
  </SecondStack.Navigator>
);

export default function App() {
  const [appState, setAppState] = useState('M');
  const [appStatePassenger, setAppStatePassenger] = useState('Passenger' );
  const [appStateDriver, setAppStateDriver] = useState( 'Driver' );
  console.log(appStateDriver,appState)
  return (
    <NavigationContainer> 
     

        <StartStack.Navigator>
      {appState ? (
        appState === 'M' ? (
          <>
            <StartStack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
              initialParams={{ appState, setAppState }}
            />
          </>
        ) : appState === 'Passenger' ? (
          <>
            {appStatePassenger ? (
              appStatePassenger === 'Signed up' || appStatePassenger === 'Logined' ? (
                <StartStack.Screen
                  name="PassengerData"
                  component={StartPessengerDrawerScreen}
                  options={{ headerShown: false }}
                  initialParams={{ appStatePassenger }}
                />
              ) : (
                <StartStack.Screen
                  name="Passenger"
                  component={StartPessengerStackScreen}
                  options={{ headerShown: false }}
                  initialParams={{ appStatePassenger, setAppStatePassenger }}
                />
              )
            ) : (
              <StartStack.Screen
                name="Loading"
                component={LoadingScreen} // Ensure you have a LoadingScreen component
                options={{ headerShown: false }}
              />
            )}
          </>
        ) : appState === 'Driver' ? (
          <>
            {appStateDriver ? (
              appStateDriver === 'Signed up' || appStateDriver === 'Logged In' ? (
                <StartStack.Screen
                  name="DriverData"
                  component={StartDriverDrawerScreen}
                  options={{ headerShown: false }}
                  initialParams={{ appStateDriver ,appState}}
                />
              ) : (
                <StartStack.Screen
                  name="Driver"
                  component={StartDriverStackScreen}
                  options={{ headerShown: false }}
                  initialParams={{ appStateDriver ,appState}}
                />
              )
            ) : (
              <StartStack.Screen
                name="Loading"
                component={LoadingScreen} // Ensure you have a LoadingScreen component
                options={{ headerShown: false }}
              />
            )}
          </>
        ) : null
      ) : (
        <StartStack.Screen
          name="Loading"
          component={LoadingScreen} // Ensure you have a LoadingScreen component
          options={{ headerShown: false }}
        />
      )}
       </StartStack.Navigator>

  </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
