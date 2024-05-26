import {React,useState,useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import axios from 'axios';
import IP_ADDRESS from '../config';
const BookingScreen = ({navigation,route}) => {
const [ride,setride]=useState([])
const [rideType, setRideType] = useState('Bike');
const [Flage, setFlage] = useState(false);
const [destination, setDestination] = useState(null);
const [destinationDetails, setDestinationDetails] = useState({});
const [location, setLocation] = useState({ latitude: 37.78825, longitude: -122.4324 });
const [selectedLocation, setSelectedLocation] = useState(null);
const [suggestions, setSuggestions] = useState([]);
const [fare, setFare] = useState('');
const [region, setRegion] = useState({
  latitude: location.latitude,
  longitude: location.longitude,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
  name:'Current'
});
const [region1, setRegion1] = useState({
  latitude: location.latitude,
  longitude: location.longitude,

});
  const getrides=()=>{
    console.log('Hi rides')
    axios.get( `http://${IP_ADDRESS}:5000/category/`)
    .then((categories)=>{
      
        // // Extract names from each category
        // const names = categories.map(category => category.name);
        // console.log(names);
    

      //ride[0]=
      console.log(categories._id)
    })
    .catch((err)=>{
      console.log('error in fetching categories',err)
    })
  }



  
  const finddriver=()=>{
    console.log('Hi driver',fare,'  ')
    axios.post( `http://${IP_ADDRESS}:5000/booking/`,{
      fare:fare,
      pickupLoc:{
        type:"Point",
        coordinates:[region.latitude,region.longitude],
        name:'Current'
      },
      destination:{
        type:"Point",
        coordinates:[region1.latitude,region1.longitude],
        name:destinationDetails,
      },
      passengerId:'60c72b6f9b1e8e30d8a3e9e6',
      categoryId:'60c72b7f9b1e8e30d8a3e9e7',
      driverOfferId:'60c72b8f9b1e8e30d8a3e9e8'})
    .then((result)=>{
      console.log('Inserted booking',result)
    })
    .catch((err)=>{
      console.log('error in inserting booking',err)
    })
  }

   
    useEffect(()=>{
      if (Flage==true){
     
      setDestinationDetails(route?.params?.location.description)
      setRegion1({
        latitude: route?.params?.location.latitude,
        longitude: route?.params?.location.longitude,
      });
      console.log('selected location ',region1)
    }
    },[Flage])
    useEffect(() => {
      (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }
  
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
        setRegion({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          name:'Current'
        });
        console.log(currentLocation)
      })();
    }, []);
    var f=0;
  
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
        onPress={(event) => {
          const newLocation = event.nativeEvent.coordinate;
          setSelectedLocation(newLocation);
          setLocation(newLocation);
          setRegion({
            latitude: newLocation.latitude,
            longitude: newLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        }}
      >
        <Marker coordinate={location} title="Current Location" />
        {selectedLocation && <Marker coordinate={selectedLocation} title="Selected Location" />}
      </MapView>
      <View style={styles.overlay}>
        <View style={styles.topSection}>
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuText}>≡</Text>
          </TouchableOpacity>
        </View>
       
          
        <View style={styles.middleSection}>
        <View style={styles.rideOptions}>
            <TouchableOpacity
              style={[styles.rideOptionButton, rideType === 'Bike' && styles.selectedRide]}
              onPress={()=>{getrides(), setRideType('Bike')}}
            >
              <Text style={styles.rideOptionText}>Bike</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.rideOptionButton, rideType === 'Auto' && styles.selectedRide]}
              onPress={() => setRideType('Auto')}
            >
              <Text style={styles.rideOptionText}>Auto</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.rideOptionButton, rideType === 'Ride A/C' && styles.selectedRide]}
              onPress={() => setRideType('Ride A/C')}
            >
              <Text style={styles.rideOptionText}>Ride A/C</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.rideOptionButton, rideType === 'Car' && styles.selectedRide]}
              onPress={() => setRideType('Car')}
            >
              <Text style={styles.rideOptionText}>Car</Text>
            </TouchableOpacity>
          </View>
          

          <TouchableOpacity onPress={()=>{}}>
          <View style={styles.mystyle}>
            <Text style={styles.mytext}>From </Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity  onPress={()=>{setFlage(true),navigation.navigate("Location")}}>
          <View style={styles.mystyle}>
            <Text style={styles.mytext} >To </Text>
          </View>
          </TouchableOpacity>
        
          <TextInput
           style={styles.input}
           placeholder="PKR Offer your fare"
           keyboardType="numeric"
           value={fare}
           onChangeText={setFare}
          />
          <TouchableOpacity onPress={finddriver} style={styles.findButton}>
            <Text style={styles.findButtonText}>Find a driver</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  menuButton: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 4,
  },
  menuText: {
    fontSize: 18,
  },
  middleSection: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  locationText: {
    fontSize: 16,
    marginBottom: 8,
  },
  destinationInput: {
    marginBottom: 50,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  mystyle:{
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
    marginBottom: 8,
  },
  mytext:{
    color: '#ccc',
  },
  suggestions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  suggestionButton: {
    backgroundColor: '#e5e5e5',
    padding: 8,
    borderRadius: 4,
  },
  suggestionText: {
    fontSize: 14,
  },
  findButton: {
    backgroundColor: '#4caf50',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  findButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  rideOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  rideOptionButton: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#e5e5e5',
  },
  selectedRide: {
    backgroundColor: '#4caf50',
  },
  rideOptionText: {
    fontSize: 14,
    color: '#000',
  },
});

export default BookingScreen;
