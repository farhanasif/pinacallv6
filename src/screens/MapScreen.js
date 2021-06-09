import React, {useState, useEffect} from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, TextInput } from 'react-native';
import * as Location from 'expo-location';
import pin_green from '../assets/images/pin-green-icon.png';
import pin_red from '../assets/images/pin-red-icon.png';
import BASE_URL from '../assets/utils/url';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


export default function MapScreen ({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState(null);
  const [nearby, setNearbyofferslist] = useState(null);
  const [loc, setLoc] = useState('')

  const _fetchData = async() => {
    try {
        let response = await fetch(
            BASE_URL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    latitude: region.latitude,
                    longitude: region.longitude,
                    action: 'getNearByRange'
                }),
            }
        );

        let responseJson = await response.json();
        console.log(responseJson);
        setNearbyofferslist(responseJson);
    }
    catch (error) {
        alert('An error occured during api data fetch: '+error);
    }
}


  useEffect(() => {
    (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
        }

        let location = await Location.getCurrentPositionAsync({});
        //console.log(location);
        setLocation(location);
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        });
      })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
      console.log(location)
    }

    const _onPress = (e) => {
      console.log(e.nativeEvent.coordinate);
      let region = {
          latitude:       e.nativeEvent.coordinate.latitude,
          longitude:      e.nativeEvent.coordinate.longitude,
          latitudeDelta:  0.00922*1.5,
          longitudeDelta: 0.00421*1.5
      }

      setRegion(region);

    }

    const _checkNearByData = async() =>{
      //alert(region.longitude);
      if(region){
        await _fetchData();
      }
    }

    const _callUsers = () => {
      navigation.navigate('CallHome')
    }

    return (
      <View style={styles.container}>
        { region ? (
          <MapView
              style={styles.mapStyle}
              region={region}
              followUserLocation={true}
              onPress={(e) => _onPress(e)}
          >
            <MapView.Marker
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
            >
              <Image
                  source={require('../assets/images/pinacall_guest.png')}
                  style={{ width: 28, height: 28 }}
              />
            </MapView.Marker>
            {nearby ? nearby.map((marker, index) => (
                <MapView.Marker
                    coordinate={{
                    latitude: parseFloat(marker.latitude),
                    longitude: parseFloat(marker.longitude),
                }}
                key={index}
                >
                  <Image
                    source={require('../assets/images/pinacall_host.png')}
                    style={{ width: 28, height: 28 }}
                  />
                </MapView.Marker>
            )) : <View></View>
          }
          </MapView>
        ): <View></View>}

        <View style={{
            position: 'absolute',
            top: 10,
            left: 20,
            height: 40,
            backgroundColor: 'white',
            width: '85%',
            flexDirection:'row',
            }}>
          {/* <TextInput
            style={{height: 40, width: '70%', marginLeft: 5}}
            placeholder="Type here for location!"
            onChangeText={loc => setLoc(loc)}
            defaultValue={loc}
          />
          <TouchableOpacity
            onPress={() => _checkNearByData()}
            style={styles.button2}>
            <Text style={styles.buttonItem2}>FIND</Text>
          </TouchableOpacity> */}
          <GooglePlacesAutocomplete
            placeholder='Enter Location'
            minLength={2}
            autoFocus={false}
            returnKeyType={'default'}
            fetchDetails={true}
            styles={{
              textInputContainer: {
                backgroundColor: 'rgba(246,12,93,0.7)',
              },
              textInput: {
                height: 38,
                color: 'rgba(246,12,93,0.7)',
                fontSize: 16,
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
            }}
            query={{
              key: 'AIzaSyDsG1DC2rI5wWiJOdglLhldqYDKlDVnS_s',
              language: 'en',
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => _checkNearByData()}
            style={styles.button}>
            <Text style={styles.buttonItem}>SEARCH</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => _callUsers()}
            style={styles.button}>
            <Text style={styles.buttonItem}>CALL</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 30,
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  button: {
    width: 150,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(246,12,93,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,

  },
  button2: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(246,12,93,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    marginLeft:10
  },

  buttonItem: {
    textAlign: 'center',
    fontWeight: '700',
    color: 'white'
  },

  buttonItem2: {
    textAlign: 'center',
    fontWeight: '400',
    color: 'white',
    fontSize: 12
  },
});
