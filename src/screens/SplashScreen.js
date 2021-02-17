import * as React from 'react';
import { View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function SplashScreen({navigation}) {

    React.useEffect(() => {
      const getdata = async() => {
        const value = await AsyncStorage.getItem('@mobile')
        if(value && value !== ''){
          navigation.navigate('Root', { screen: 'Home' });
        }
        else{
          navigation.navigate('Signin');
        }
      }

      getdata()
    }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{
                paddingTop: 40,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
          <Image
            style={{height: 140, width: 140}}
            source={require('../assets/images/pinacall_final_01.png')}
          />
        </View>
    </View>
  );
}