// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import axios from 'axios';
// import * as Location from 'expo-location';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';



// const homePlace = {
  
//   description: 'Home',
//   geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
// };
// const workPlace = {
//   description: 'Work',
//   geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
// };

// const LocationSearchPage = () => {
//   const [keyword, setKeyword] = useState('');
//   const [location, setLocation] = useState({ latitude: 37.78825, longitude: -122.4324 });
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [suggestions, setSuggestions] = useState([]);
//   const [region, setRegion] = useState({
//     latitude: location.latitude,
//     longitude: location.longitude,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   });

//   useEffect(() => {
//     (async () => {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         console.log('Permission to access location was denied');
//         return;
//       }

//       const currentLocation = await Location.getCurrentPositionAsync({});
//       setLocation({
//         latitude: currentLocation.coords.latitude,
//         longitude: currentLocation.coords.longitude,
//       });
//       setRegion({
//         latitude: currentLocation.coords.latitude,
//         longitude: currentLocation.coords.longitude,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421,
//       });
//       console.log(currentLocation)
//     })();
//   }, []);

//   const handleSearch = async () => {
//     try {
//       console.log('hello')
//       const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
//         params: {
//           address: keyword,
//           key: 'YOUR_GOOGLE_API_KEY',
//         },
//       });

//       if (response.data.results.length > 0) {
//         const locationData = response.data.results[0].geometry.location;
//         const newLocation = {
//           latitude: locationData.lat,
//           longitude: locationData.lng,
//         };
//         setLocation(newLocation);
//         setSelectedLocation(newLocation);
//         setRegion({
//           latitude: newLocation.latitude,
//           longitude: newLocation.longitude,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         });
//         console.log(newLocation);
//       }
//     } catch (error) {
//       console.error('Geocode API error:', error);
//     }
//   };

//   const handleAutocomplete = async (input) => {
//     try {
//       const response = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
//         params: {
//           input,
//           key: 'YOUR_GOOGLE_API_KEY',
//         },
//       });

//       console.log('Autocomplete response:', response.data);

//       if (response.data.status === 'OK') {
//         setSuggestions(response.data.predictions);
//       } else {
//         console.error('Autocomplete API error:', response.data.status, response.data.error_message);
//         setSuggestions([]);
//       }
//     } catch (error) {
//       console.error('Autocomplete API request error:', error);
//       setSuggestions([]);
//     }
//   };

//   const handleSuggestionSelect = async (placeId) => {
//     try {
//       const response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
//         params: {
//           place_id: placeId,
//           key: 'YOUR_GOOGLE_API_KEY',
//         },
//       });

//       if (response.data.status === 'OK') {
//         const locationData = response.data.result.geometry.location;
//         const newLocation = {
//           latitude: locationData.lat,
//           longitude: locationData.lng,
//         };
//         setLocation(newLocation);
//         setSelectedLocation(newLocation);
//         setRegion({
//           latitude: newLocation.latitude,
//           longitude: newLocation.longitude,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         });
//         setSuggestions([]);
//       } else {
//         console.error('Place details API error:', response.data.status, response.data.error_message);
//       }
//     } catch (error) {
//       console.error('Place details API request error:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Enter your Location</Text>
//       <View style={styles.searchContainer}>
//           <GooglePlacesAutocomplete
//           // style={styles.input}
//           placeholder='Search'
//           value={keyword}
//           onChangeText={(text) => {
//             setKeyword(text);
           
//           }}
//           onPress={(data, details = null) => {
//             // 'details' is provided when fetchDetails = true
//             console.log(data, details);
//           }}
//           query={{
//             key: 'YOUR API KEY',
//             language: 'en',
//           }}
//           predefinedPlaces={[homePlace, workPlace]}
//         />
       
//         <Button title="Search" onPress={handleSearch} />
//       </View>
//       {suggestions.length > 0 && (
//         <FlatList
//           data={suggestions}
//           keyExtractor={(item) => item.place_id}
//           renderItem={({ item }) => (
//             <TouchableOpacity onPress={() => handleSuggestionSelect(item.place_id)}>
//               <Text style={styles.suggestionItem}>{item.description}</Text>
//             </TouchableOpacity>
//           )}
//           style={styles.suggestionsList}
//         />
//       )}
//       <MapView
//         style={styles.map}
//         region={region}
//         onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
//         onPress={(event) => {
//           const newLocation = event.nativeEvent.coordinate;
//           setSelectedLocation(newLocation);
//           setLocation(newLocation);
//           setRegion({
//             latitude: newLocation.latitude,
//             longitude: newLocation.longitude,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           });
//         }}
//       >
//         <Marker coordinate={location} title="Current Location" />
//         {selectedLocation && <Marker coordinate={selectedLocation} title="Selected Location" />}
//       </MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop: 20,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     marginBottom: 20,
//     width: '90%',
//     justifyContent: 'space-between',
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   mapInstruction: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   map: {
//     width: '100%',
//     height: 350,
//   },
//   input: {
//     width: '70%',
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingLeft: 10,
//   },
//   button: {
//     width: '25%',
//   },
//   suggestionsList: {
//     width: '90%',
//     backgroundColor: 'white',
//     position: 'absolute',
//     top: 100,
//     zIndex: 1,
//   },
//   suggestionItem: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
// });

// export default LocationSearchPage;



import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';



const homePlace = {
  
  description: 'Home',
  geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
};
const workPlace = {
  description: 'Work',
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
};

const  LocationSearchPage =  ({navigation}) => {
 
  return (
    <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
         navigation.navigate('Booking', { location: { description: data.description, geometry: details.geometry } });
        // console.log(data, details);
      }}
      query={{
        key: 'YOUR API KEY',
        language: 'en',
      }}
      predefinedPlaces={[homePlace, workPlace]}
    />
  );
};

export default  LocationSearchPage;

