import React, { useEffect, useState } from 'react';
import { View, Text,Image,  Button, TouchableOpacity,StyleSheet, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../assets/utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CallHome = ({navigation}) => {
    const [msg, setMsg] = React.useState('Call is not initiated....')
    const [update, setUpdate] = useState('')
    const [mobile, setMobile] = useState('')
    const [counter, setCounter] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const [service_type, setService] = useState('guest');

    useEffect(() => {
        const getdata = async() => {
            const value = await AsyncStorage.getItem('@mobile')
            setMobile(value)
        }

        getdata()
      }, [])

    const _callVoice = () => {
        Alert.alert(
            'Pinacall',
            'Audio Call is not enabled for now.'
        );
    }

    const _callVideo = async() => {
        setMsg('Initiating Video Call.....')
        let response = await fetch(
            'http://103.108.144.246/pinacallapi/process.php',
              {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      mobile: mobile,
                      action: 'sendUserRequest'
                  }),
              }
          );
          let responseJson = await response.json();
          console.log('response',responseJson)
          setMsg('Call Initiated. Waiting for host to connect...')

          //setting a timer to get receiver mobile
          intervalId = setInterval( async() => {
            if(isActive == false){
              return () => clearInterval(intervalId);
            }
            else{
              console.log('guest',counter)

              if(service_type == 'guest'){
                let response = await fetch(
                  'http://103.108.144.246/pinacallapi/process.php',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            mobile: mobile,
                            action: 'getnotifyForCallGuest'
                        }),
                    }
                );

                let responseJson = await response.json();
                console.log('guest response',responseJson);
                if(responseJson.length > 0){
                  if(responseJson[0].status == 0 && responseJson[0].receiver_mobile !== ''){
                    setIsActive(false);
                    setMsg('One host joined the call. Initiating video call')
                  }
                }
                else{

                    console.log('no call activated')
                }
              }



              console.log('guest counter', counter)
            }

            setCounter(counter => counter + 1);
          }, 3000)
    }
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
            <Text style={{fontWeight: '700', fontSize: 17, color: COLORS.pinacall_pink}}>You are going to pin a call</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => _callVideo()}
                    style={styles.button}>
                    <Text style={styles.buttonItem}>Video Call</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => _callVoice()}
                    style={styles.button}>
                    <Text style={styles.buttonItem}>Voice Call</Text>
                </TouchableOpacity>
            </View>

            <Text style={{fontWeight: '700', fontSize: 17, color: COLORS.blue}}>{msg}</Text>
            <Text style={{fontWeight: '700', fontSize: 17, color: COLORS.blue}}>{update}</Text>
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

    buttonItem: {
      textAlign: 'center',
      fontWeight: '700',
      color: 'white'
    },
});

export default CallHome;