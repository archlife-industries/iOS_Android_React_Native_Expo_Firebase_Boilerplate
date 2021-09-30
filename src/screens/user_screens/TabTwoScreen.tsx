import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Text, View } from '../../../components/Themed';
import TextInput from "../../../components/TextInput";
import { Avatar } from 'react-native-paper';
import { useState } from 'react';
import firebase from 'firebase/app';
import Button from "../../../components/Button";
import { logoutUser } from "../../../api/auth-api";
import { Navigation } from "../../../types";
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

type Props = {
  navigation: Navigation;
};

export default function ProfileScreen({ navigation }: Props) {

  const userEmail = firebase.auth().currentUser.email;
  const [photoURL, setPhotoURL] = useState("https://github.com/landscapesupply/images/blob/main/landscape_supply_app_default_profile_icon.png?raw=true");
  const [emailUsername, setEmailUsername] = useState("");
  const [emailSuffix, setEmailSuffix] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState(0);
  //STYLES
  const colorScheme = useColorScheme();
  const [savedChangesTextColor, setSavedChangesTextColor] = useState(Colors[colorScheme].background)
  // TEMP VARIABLES TO HOLD USER INPUT
  const [tempPhotoURL, setTempPhotoURL] = useState("https://github.com/landscapesupply/images/blob/main/landscape_supply_app_default_profile_icon.png?raw=true");
  const [tempFirstName, setTempFirstName] = useState("");
  const [tempLastName, setTempLastName] = useState("");
  const [tempHeight, setTempHeight] = useState(0);
  const [tempWeight, setTempWeight] = useState(0);
  const [tempBodyFatPercentage, setTempBF] = useState(0);
  const [tempAge, setTempAge] = useState(0);
  const [tempPhone, setTempPhone] = useState(0);

  function fetchUserDetails() {
    firebase.firestore().collection('users').doc(userEmail).get().then(documentSnapshot => {
      if (documentSnapshot.exists) {
        setPhotoURL(documentSnapshot.get("photoURL"));
        setEmailUsername(userEmail.split("@")[0]);
        setEmailSuffix(userEmail.split("@")[1]);
        setFirstName(documentSnapshot.get("firstName"));
        setLastName(documentSnapshot.get("lastName"));
        setPhone(parseInt(documentSnapshot.get("phone")));
      };
    });
  };

  fetchUserDetails();

  return (
    <View style={styles.container}>
      <View style={styles.getStartedContainer}>
        <KeyboardAvoidingView style={styles.keyboardavoidcontainer} behavior="padding">
          <View style={styles.upperrow}>
            <View style={styles.column}>
              <Avatar.Image source={{ uri: photoURL }} size={verticalScale(125)} style={styles.profilePhoto} />
            </View>
            <View style={styles.column}>
              <Text style={{ fontSize: verticalScale(32), fontWeight: 'bold', color: Colors[colorScheme].firstName }} numberOfLines={1} adjustsFontSizeToFit>{emailUsername.toUpperCase()}</Text>
              <Text style={{ fontSize: verticalScale(20), fontWeight: 'bold', marginBottom: 10, color: Colors[colorScheme].lastName }} numberOfLines={1} adjustsFontSizeToFit>@{emailSuffix.toUpperCase()}</Text>
              <Button mode="outlined" color="#1c1c1c" onPress={logoutUser} style={styles.logoutButton}>Logout</Button>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              {/* BEGIN USER TEXT INPUTS... */}
              <Text style={styles.labels}>👤 First Name</Text>
              <TextInput placeholder={`${firstName}`} onChangeText={text => setTempFirstName(text)} label="" returnKeyType="next" theme={{ colors: { primary: "#1C1C1C" } }} selectionColor={'#777777'} style={styles.textInput} keyboardType="default" />
            </View>
            <View style={styles.column}>
              <Text style={styles.labels}>👥 Last Name</Text>
              <TextInput placeholder={`${lastName}`} onChangeText={text => setTempLastName(text)} label="" returnKeyType="next" theme={{ colors: { primary: "#1C1C1C" } }} selectionColor={'#777777'} style={styles.textInput} keyboardType="default" />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.labels}>📱 Phone Number</Text>
              <TextInput placeholder={`(${phone.toString().substring(0, 3)}) ${phone.toString().substring(3, 6)}-${phone.toString().substring(6)}`} onChangeText={text => setTempPhone(parseInt(text))} label="" returnKeyType="next" theme={{ colors: { primary: "#1C1C1C" } }} selectionColor={'#777777'} style={styles.textInput} keyboardType="phone-pad" />
            </View>
            <View style={styles.column}>
              <Text style={styles.labels} numberOfLines={1} adjustsFontSizeToFit>😁 Profile Photo URL</Text>
              <TextInput numberOfLines={1} placeholder={`${photoURL.toString()}`} onChangeText={text => setTempPhotoURL(text)} label="" returnKeyType="next" theme={{ colors: { primary: "#1C1C1C" } }} selectionColor={'#777777'} style={styles.textInput} keyboardType="default" />
            </View>
          </View>
          {/* END USER TEXT INPUTS... */}
          <Button mode="outlined" color="#1c1c1c" onPress={() => updateUserInfo(userEmail, tempFirstName, tempLastName, tempHeight, tempWeight, tempBodyFatPercentage, tempAge, tempPhone, tempPhotoURL, photoURL)} style={styles.updateProfileButton}>UPDATE PROFILE</Button>
          <Text style={{ color: savedChangesTextColor, fontSize: verticalScale(24), fontWeight: 'bold', marginTop: verticalScale(15) }}>CHANGES SAVED!</Text>
        </KeyboardAvoidingView>
      </View>
    </View>
  );

  function updateUserInfo(userEmail, tempFirstName, tempLastName, tempHeight, tempWeight, tempBodyFatPercentage, tempAge, tempPhone, tempPhotoURL, photoURL) {

    fetchUserDetails();
    const userRef = firebase.firestore().collection('users').doc(userEmail);
    if (tempFirstName !== "") { userRef.update({ firstName: tempFirstName }); };
    if (tempLastName !== "") { userRef.update({ lastName: tempLastName }); };
    if (tempHeight > 0) { userRef.update({ height: tempHeight }); };
    if (tempWeight > 0) { userRef.update({ weight: tempWeight }); };
    if (tempBodyFatPercentage > 0) { userRef.update({ bodyFatPercentage: tempBodyFatPercentage }); };
    if (tempAge > 0) { userRef.update({ age: tempAge }); };
    if ((tempPhone > 0) && (tempPhone.toString().length === 10)) { userRef.update({ phone: tempPhone }); };
    if ((tempPhotoURL !== photoURL) && (tempPhotoURL !== "https://ryan.zernach.com/wp-content/uploads/ADP_Sq_Icon_512-1.png")) { userRef.update({ photoURL: tempPhotoURL }); };
    fetchUserDetails();

    setSavedChangesTextColor(Colors[colorScheme].changesSaved);
    setTimeout(() => { setSavedChangesTextColor(Colors[colorScheme].background); }, 3000);

  };
}

const styles = StyleSheet.create({
  myView: {
    marginTop: 30
  },
  modal: {
  },
  innerModal: {
    flex: 0,
    backgroundColor: "#1C1C1C1C",
  },
  labels: {
    marginLeft: 7,
    marginBottom: -5,
    marginTop: 5,
    fontSize: verticalScale(12)
  },
  row: {
    flexDirection: 'row',
    flex: 0,
    flexWrap: "wrap"
  },
  upperrow: {
    flexDirection: 'row',
    flex: 0,
    marginTop: "8%",
    flexWrap: "wrap"
  },
  buttonrow: {
    flexDirection: 'row',
    flex: 0,
    marginTop: verticalScale(10)
  },
  column: {
    width: "50%",
    flexDirection: 'column',
    flexWrap: "wrap"
  },
  buttoncolumn: {
    width: "33.33%",
    flexDirection: 'column',
    flexWrap: "wrap"
  },
  logoutButton: {
    marginTop: 0,
    width: "95%",
    backgroundColor: "#999999",
    marginBottom: 0,
    alignSelf: "auto",
  },
  updateProfileButton: {
    marginTop: verticalScale(20),
    width: "97%",
    backgroundColor: "#999999",
    marginBottom: 0,
    alignSelf: "center",
  },
  okayModalButton: {
    marginTop: 15,
    width: scale(200),
    backgroundColor: "#999999",
    marginBottom: 20,
    alignSelf: "center",
  },
  profilePhoto: {
    marginBottom: 20,
    alignSelf: "center",
  },
  modalProfilePhoto: {
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "center",
  },
  input: {
  },
  textInput: {
    margin: 0,
    marginTop: -10,
    marginBottom: -10,
    height: verticalScale(32),
    width: "95%",
    alignSelf: "center",
    fontSize: verticalScale(14)
  },
  singleRowTextInput: {
    margin: 0,
    marginTop: -10,
    marginBottom: -10,
    height: 49,
    width: "97.5%",
    alignSelf: "center",
  },
  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   flexDirection: 'column',
  //   paddingTop: 0,
  //   width: "100%",
  // },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyboardavoidcontainer: {
    flex: 1,
    padding: 2,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 0,
  },
  trainernamemodal: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 0,
    marginBottom: 15,
    textAlign: "center",
    color: "#FFFFFF",
  },
  h1: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 0,
  },
  h2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#C1C1C1"
  },
  h2modal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#C1C1C1",
    textAlign: "center",
  },
  h3: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 0,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});