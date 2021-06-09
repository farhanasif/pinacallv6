import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text,Image,  Button, TouchableOpacity,StyleSheet, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../assets/utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from '../assets/utils/url';
import { call } from 'react-native-reanimated';
import { CommonActions } from '@react-navigation/native';

const CallHome = ({navigation}) => {
    const [msg, setMsg] = React.useState('Call is not initiated....')
    const [update, setUpdate] = useState('')
    const [mobile, setMobile] = useState('')
    const [counter, setCounter] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [service_type, setService] = useState('guest');
    const [isclick, setIsClick] = useState(0);
    const [callid, setCallid] = useState(0);

    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={{paddingRight: 20}}
            onPress={() => console.log('here')}
          >
            <FontAwesome name="bars" size={23} color={COLORS.pinacall_pink} />
          </TouchableOpacity>
        ),
      });
    }, [navigation]);

    useEffect(() => {
        const getdata = async() => {
            const value = await AsyncStorage.getItem('@mobile')
            setMobile(value)
        }

        getdata()
    }, [])

    useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval( async() => {
        console.log('isactive', isActive)
        if(isActive == false){
          return () => clearInterval(intervalId);
        }
        else{
          console.log('guest',counter)

          if(service_type == 'guest'){
            let response = await fetch(
              BASE_URL,
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
              if(responseJson[0].receiver_mobile == '' || responseJson[0].receiver_mobile == undefined){}
              else{
                console.log('setting inactive to false')
                setIsActive(false)
                setMsg('One host joined the call. Initiating video call')
                navigation.navigate('VideoCall', {
                  mobile: mobile,
                  callid: callid
                });
                setMsg('')
                return () => clearInterval(intervalId);
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

    return () => clearInterval(intervalId);
  }, [isActive, counter])

    const _callVoice = () => {
        Alert.alert(
            'Pinacall',
            'Audio Call is not enabled for now.'
        );
    }

    const _callVideo = async() => {

        setIsClick(1);
        if(isclick == 0){
          setMsg('Initiating Video Call.....')
          let response = await fetch(
            BASE_URL,
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
          let last = responseJson.callid;
          setCallid(last)
          console.log('response',responseJson)
          setMsg('Call Initiated. Waiting for host to connect...')

          //setting a timer to get receiver mobile
          setIsActive(true)
        }

    }

    const _callReturn = () => {
      console.log('clicked')
      navigation.navigate('Home');
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
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => _callReturn()}
                    style={styles.button2}>
                    <Text style={styles.buttonItem}>Return</Text>
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
      width: 150,
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: '#E7412B',
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