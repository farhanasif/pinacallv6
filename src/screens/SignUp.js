import React, {useState, useRef} from 'react';
import { StyleSheet, Text, View,Image, TouchableOpacity,Alert, TextInput } from 'react-native';
import { Input, Button, CheckBox } from 'react-native-elements';
import { Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../assets/utils/colors';

const screen = Dimensions.get("screen");
const WIDTH = screen.width;

const SignUp = ({ navigation }) => {
  const [checked, setChecked] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpass, setConfirmpass] = useState('');
  const [mobile, setMobile] = useState('');

  //using ref for enter key press handle in React
  const ref_name = useRef()
  const ref_email = useRef()
  const ref_password = useRef()
  const ref_confirm = useRef()
  const ref_mobile = useRef()



  const updateCheck = () => {
    setChecked(!checked);
  }

  const signUp = async() => {
    if(mobile == '' || password == '' || name == '' || password !== confirmpass){
      alert('Please fill up all the inputs correctly')
    }
    else{
      //fetch signup data
      let response = await fetch(
        'http://103.108.144.246/pinacallapi/process.php',
          {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  mobile: mobile,
                  password: password,
                  name: name,
                  email: email,
                  checked: checked,
                  action: 'signup'
              }),
          }
      );
      let responseJson = await response.json();
      console.log('response',responseJson.status)
      //if success login user
      if(responseJson.status == '200'){
        alert('success')
      }
      else{
        Alert.alert(
          'Pinacall',
          'User already exists'
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
            <Entypo style={styles.searchIcon} name="user" size={24}/>
            <TextInput
                style={styles.input}
                placeholder="Your Name"
                underlineColorAndroid={COLORS.pinacall_pink}
                onChangeText={name => setName(name)}
                defaultValue={name}
                autoFocus={true}
                returnKeyType="next"
                onSubmitEditing={() => ref_email.current.focus()}
                ref={ref_name}
            />
        </View>
        <View style={styles.searchSection}>
            <Entypo style={styles.searchIcon} name="mail" size={24}/>
            <TextInput
                style={styles.input}
                placeholder="Email"
                underlineColorAndroid={COLORS.pinacall_pink}
                onChangeText={email => setEmail(email)}
                defaultValue={email}
                returnKeyType="next"
                onSubmitEditing={() => ref_password.current.focus()}
                ref={ref_email}
            />
        </View>
        <View style={styles.searchSection}>
            <Entypo style={styles.searchIcon} name="keyboard" size={24}/>
            <TextInput
                style={styles.input}
                placeholder="Password"
                underlineColorAndroid={COLORS.pinacall_pink}
                onChangeText={password => setPassword(password)}
                defaultValue={password}
                secureTextEntry={true}
                returnKeyType="next"
                onSubmitEditing={() => ref_confirm.current.focus()}
                ref={ref_password}
            />
        </View>
        <View style={styles.searchSection}>
            <Entypo style={styles.searchIcon} name="keyboard" size={24}/>
            <TextInput
                style={styles.input}
                placeholder="Confirm password"
                underlineColorAndroid={COLORS.pinacall_pink}
                onChangeText={confirmpass => setConfirmpass(confirmpass)}
                defaultValue={confirmpass}
                secureTextEntry={true}
                returnKeyType="next"
                onSubmitEditing={() => ref_mobile.current.focus()}
                ref={ref_confirm}
            />
        </View>
        <View style={styles.searchSection}>
            <Entypo style={styles.searchIcon} name="mobile" size={24}/>
            <TextInput
                style={styles.input}
                placeholder="Mobile"
                underlineColorAndroid={COLORS.pinacall_pink}
                onChangeText={mobile => setMobile(mobile)}
                defaultValue={mobile}
                keyboardType='number-pad'
                ref={ref_mobile}
            />
        </View>

        <CheckBox
            title='sign up as host'
            checked={checked}
            onPress={updateCheck}
            textStyle={{ color: COLORS.pinacall_pink }}
            containerStyle={{ backgroundColor: COLORS.white }}
            checkedColor={COLORS.pinacall_pink}
            style={{ backgroundColor: COLORS.white, borderColor: COLORS.white }}
        />



        <Button
          title="Create Account"
          icon={
            <FontAwesome
              name="check"
              size={15}
              color="white"
              style={{marginRight: 10}}
            />
          }
          buttonStyle={{marginTop: 20,}}
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: ['#E7412B','#F50B5E','#CF005F', '#9A0F3C'],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 },
          }}
          onPress={signUp}
        />
        <Button
          title="Use Gmail Account"
          icon={
            <MaterialCommunityIcons
              name="gmail"
              size={15}
              color="white"
              style={{marginRight: 10}}
            />
          }
          buttonStyle={{marginTop: 10,}}
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: ['#E7412B','#F50B5E','#CF005F', '#9A0F3C'],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 },
          }}
        />
        <Button
          title="Already Have An Account? Login here"
          type="clear"
          titleStyle={{ color: COLORS.pinacall_pink}}
          onPress={() => navigation.navigate('Signin')}
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
    width: 220,
    height: 210,
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
      paddingLeft: 0,
      backgroundColor: COLORS.white,
      color: COLORS.placeholder,
      fontSize: 15
  },
});

export default SignUp;