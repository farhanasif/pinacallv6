import * as React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../assets/utils/colors';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function MapText({navigation}) {

    return (
        <View style={{
            position: 'absolute',
            top: 10,
            left: 20,
            height: 40,
            backgroundColor: 'white',
            width: '85%',
            flexDirection:'row',
            }}>
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
              components: 'country:bd',
            }}
          />
        </View>
    );
}