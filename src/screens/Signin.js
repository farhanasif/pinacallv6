import React, { useEffect, useRef } from 'react';
import {useState} from 'react';
import { StyleSheet, Text, View,Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../assets/utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BASE_URL from '../assets/utils/url';


const screen = Dimensions.get("screen");
const WIDTH = screen.width;

const Signin = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');

  const ref_password = useRef()
  const ref_mobile = useRef()

  useEffect(() => {
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

  const _signin = async() => {
    //alert('success')
    if(mobile == '' || password == ''){
      alert('enter mobile & password together..');
    }
    else{
      //fetch data
      let otp_value = '1234'; // await Math.floor(1000 + Math.random() * 9000);
      let otp_message =  await otp_value+" is your one-time password for Pinacall."
      console.log(otp_message)

      let response = await fetch(
        BASE_URL,
          {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  mobile: mobile,
                  password: password,
                  otp_value: otp_value,
                  otp_message: otp_message,
                  action: 'signin'
              }),
          }
      );
      let responseJson = await response.json();
      console.log('response',responseJson)
      //if success login user
      if(responseJson.length > 0){
        // await AsyncStorage.setItem('@mobile', responseJson[0].phone_no);
        // await AsyncStorage.setItem('@name', responseJson[0].firstname);
        // await AsyncStorage.setItem('@service_type', responseJson[0].servicetype);
        navigation.navigate('OTP', {
          otp_val: otp_value,
          phone_no: responseJson[0].phone_no,
          name: responseJson[0].firstname,
          service_type: responseJson[0].servicetype
        });
      }
      else{
        Alert.alert(
          'Pinacall',
          'Mobile or password not matched.'
        );
      }

    }

  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/pinacall_final_01.png")}
        resizeMode="contain"
        style={styles.image}
      ></Image>
      <View style={{marginHorizontal: 10}}>
        <View style={styles.searchSection}>
            <Entypo style={styles.searchIcon} name="mobile" size={24}/>
            <TextInput
                style={styles.input}
                placeholder="MOBILE"
                underlineColorAndroid={COLORS.pinacall_pink}
                onChangeText={text => setMobile(text)}
                defaultValue={mobile}
                keyboardType='number-pad'
                returnKeyType="next"
                onSubmitEditing={() => ref_password.current.focus()}
                ref={ref_mobile}
            />
        </View>
        <View style={styles.searchSection}>
            <Entypo style={styles.searchIcon} name="keyboard" size={24}/>
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="PASSWORD"
                underlineColorAndroid={COLORS.pinacall_pink}
                onChangeText={password => setPassword(password)}
                defaultValue={password}
                secureTextEntry={true}
                ref={ref_password}
            />
        </View>
        <Button
          title="Sign In"
          icon={
            <FontAwesome
              name="sign-in"
              size={15}
              color="white"
              style={{marginRight: 10}}
            />
          }
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: ['#E7412B','#F50B5E','#CF005F', '#9A0F3C'],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 },
          }}
          buttonStyle={{marginTop: 20,}}
          onPress={_signin}
        />
        <Button
          title="Sign In With Gmail"
          icon={
            <MaterialCommunityIcons
              name="gmail"
              size={15}
              color="white"
              style={{marginRight: 10}}
            />
          }
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: ['#E7412B','#F50B5E','#CF005F', '#9A0F3C'],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 },
          }}
          buttonStyle={{marginTop: 10, width: 200}}
        />
        <Button
          title="Create a new account"
          type="clear"
          titleStyle={{ color: COLORS.pinacall_pink }}
          onPress={() => navigation.navigate('SignUp')}
        />
        <Button
          title="Forgot Password"
          type="clear"
          titleStyle={{ color: COLORS.pinacall_pink }}
          onPress={() => navigation.navigate('ForgotPassword')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 260,
    height: 250,
    marginTop: 0,
    alignSelf: "center"
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  searchIcon: {
      padding: 10,
      color: COLORS.pinacall_pink,
  },
  input: {
      flex: 1,
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 3,
      backgroundColor: COLORS.white,
      color: COLORS.placeholder,
      fontSize: 15
  },
});

export default Signin;