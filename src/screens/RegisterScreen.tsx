import Logo from "../../components/Logo";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import Toast from "../../components/Toast";
import firebase from "firebase/app";
import RNPickerSelect from 'react-native-picker-select';
import { theme } from "../core/theme";
import { Navigation } from "../../types";
import { emailValidator, passwordValidator, nameValidator } from "../core/utils";
import { signInUser } from "../../api/auth-api";
import React, { memo, useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

type Props = { navigation: Navigation; };

const RegisterScreen = ({ navigation }: Props) => {

  const [firstName, setFirstName] = useState({ value: "", error: "" });
  const [lastName, setLastName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [trainersList, setTrainersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const colorScheme = useColorScheme();
  const [yearOptions, setYearOptions] = useState([]);
  // GENERATES AN ARRAY OF YEARS FROM 1990 to CURRENT YEAR FOR BIRTH YEAR SELECTOR
  // var yearOptionsTemp = [];
  // Array((new Date().getFullYear()) - 1900 + 1).fill().map((_, idx) => 1900 + idx).map(String).forEach(yearOption => {
  //   yearOptionsTemp.push(yearOption)
  // })
  // console.log(yearOptionsTemp);

  // CHECKS FOR USER INPUT ERRORS & CREATES NEW USER IN FIREBASE AUTH & FIRESTORE
  const _onSignUpPressed = async () => {
    if (loading) return;
    // CHECK FOR ERRORS AMONG USER INPUTS
    const firstNameError = nameValidator(firstName.value);
    const lastNameError = nameValidator(lastName.value);
    const emailError = emailValidator(email.value.toLowerCase());
    const passwordError = passwordValidator(password.value);
    // IF ERROR(S) EXIST, THEN SAVE THE ERRORS
    if (emailError || passwordError || firstNameError || lastNameError) {
      setFirstName({ ...firstName, error: firstNameError });
      setLastName({ ...lastName, error: lastNameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    setLoading(true);
    const response = await signInUser({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value.toLowerCase(),
      password: password.value
    });
    if (response.error) {
      setError(response.error);
    }

    // #1) ADD NEW USER...
    firebase.firestore().collection('users').doc(email.value.toLowerCase()).set({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value.toLowerCase(),
      // trainer: trainer.value,
      phone: 1234567890,
      photoURL: "https://archlife.org/wp-content/uploads/2020/07/cropped-AI-Archlife-Industries-Icon-DarkGrey-Background.png",
      isActive: true,
      userType: "admin"
    }).then(() => { console.log('New user added!'); });

    // let date = new Date();
    // let currentDate = date.toDateString()
    // let currentTime = date.toTimeString();
    // let userRef = firebase.firestore().collection('users').doc(email.value.toLocaleLowerCase())
    // // #2) NEW USER'S ZERO-th PAYMENT -- RECORD TIMESTAMP/DATESTAMP
    // userRef.collection('payments').doc(`0000 -- ${date.toString()}`).set({
    //   key: 0,
    //   timestamp: currentTime,
    //   datestamp: currentDate,
    //   trainer: trainer.value,
    //   dollars: 0,
    //   dollarsPerSession: 0,
    //   sessions: 0,
    //   isDeleted: false,
    //   notes: "This is when your ADP account was created. This does not count as one of your payments.",
    // });

    setLoading(false);
  };

  // DISPLAY FRONT-END USER INTERFACE
  return (
    <ImageBackground style={{ flex: 1, width: "100%", backgroundColor: Colors[colorScheme].background }} >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")} style={styles.backbutton}>
          <Text style={{ color: Colors[colorScheme].subtext, fontWeight: "500" }}>← BACK</Text>
        </TouchableOpacity>
        <Logo />
        <Text style={{ color: Colors[colorScheme].loginRegisterForgotPass, fontWeight: "bold", fontSize: 30, marginTop: "-5%", marginBottom: "5%" }}>JOIN THE CLUB</Text>
        <View style={styles.row}>
          <View style={styles.leftColumn}>
            <Text style={{ color: Colors[colorScheme].subtext, textAlign: "center", marginLeft: 0, marginRight: 0, marginBottom: 0, fontSize: 14, fontWeight: "bold" }}>Upon signup, you will be unable to change your email address.</Text>
          </View>
          <View style={styles.rightColumn}>
            <View style={styles.pickerContainer}>
              <Text style={{ color: Colors[colorScheme].subtext, textAlign: "center", marginTop: 6, marginLeft: 0, marginRight: 0, marginBottom: 4, fontSize: 14, fontWeight: "bold" }}>Year of birth?</Text>
              <View style={styles.picker}>
                {/* <RNPickerSelect onValueChange={(inputValue) => setTrainerValue(inputValue)} items={trainersList} style={{
                  inputIOS: {
                    color: Colors[colorScheme].text,
                    fontSize: 15,
                    fontWeight: "bold"
                  },
                  inputAndroid: {
                    color: Colors[colorScheme].text,
                    fontSize: 15,
                  },
                  placeholderColor: Colors[colorScheme].text,
                  underline: { borderTopWidth: 0 },
                  icon: {
                    position: 'absolute',
                    backgroundColor: 'transparent',
                    borderTopWidth: 5,
                    borderTopColor: '#00000099',
                    borderRightWidth: 5,
                    borderRightColor: 'transparent',
                    borderLeftWidth: 5,
                    borderLeftColor: 'transparent',
                    width: 0,
                    height: 0,
                    top: 20,
                    right: 15,
                  },
                }} /> */}
              </View>
            </View>
          </View>
        </View>
        <TextInput label="👤 First Name" returnKeyType="next" value={firstName.value} onChangeText={text => setFirstName({ value: text, error: "" })} error={!!firstName.error} errorText={firstName.error} theme={{ colors: { primary: "#1C1C1C" } }} selectionColor={'#777777'} style={styles.textInput} />
        <TextInput label="👥 Last Name" returnKeyType="next" value={lastName.value} onChangeText={text => setLastName({ value: text, error: "" })} error={!!lastName.error} errorText={lastName.error} theme={{ colors: { primary: "#1C1C1C" } }} selectionColor={'#777777'} style={styles.textInput} />
        <TextInput label="✉️ Email" returnKeyType="next" value={email.value} onChangeText={text => setEmail({ value: text, error: "" })} error={!!email.error} errorText={email.error} autoCapitalize="none" autoCompleteType="email" textContentType="emailAddress" keyboardType="email-address" theme={{ colors: { primary: "#1C1C1C" } }} selectionColor={'#777777'} style={styles.textInput} />
        <TextInput label="🔑 Password" returnKeyType="done" value={password.value} onChangeText={text => setPassword({ value: text, error: "" })} error={!!password.error} secureTextEntry autoCapitalize="none" theme={{ colors: { primary: "#1C1C1C" } }} selectionColor={'#777777'} style={styles.textInput} />
        <Button loading={loading} mode="contained" onPress={_onSignUpPressed} style={styles.button} color={Colors[colorScheme].login} >
          <Text>SIGN UP</Text>
        </Button>
        <Toast message={error} onDismiss={() => setError("")} />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: 13,
  },
  leftColumn: {
    width: "50%",
    flexDirection: 'column',
    flex: 0,
    alignContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginTop: 10,
    marginBottom: 0,
  },
  rightColumn: {
    width: "50%",
    flexDirection: 'column',
    flex: 0,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 0,
  },
  pickerContainer: {
    marginTop: 0,
    marginBottom: 10,
  },
  picker: {
    marginLeft: 15,
  },
  note: {
    textAlign: "center",
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    fontSize: 14,
  },
  noteTrainer: {
    textAlign: "center",
    marginTop: 6,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 4,
    fontSize: 14,
  },
  textInput: {
    margin: 0,
    marginTop: -8,
    marginBottom: -12,
    height: moderateScale(32)
  },
  label: {
    color: theme.colors.secondary
  },
  button: {
    marginTop: 24,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary
  },
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  backbutton: {
    position: 'absolute',
    top: verticalScale(50),//getStatusBarHeight(),
    left: 10,
  },
});

const pickerStyle = {
  inputIOS: {
    color: '#1C1C1C',
    fontSize: 15,
  },
  inputAndroid: {
    color: 'black',
    fontSize: 15,
  },
  placeholderColor: 'black',
  underline: { borderTopWidth: 0 },
  icon: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderTopWidth: 5,
    borderTopColor: '#00000099',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    width: 0,
    height: 0,
    top: 20,
    right: 15,
  },
};

export default memo(RegisterScreen);