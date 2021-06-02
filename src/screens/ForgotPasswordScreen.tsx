import React, { memo, useState } from "react";
import { StyleSheet, ImageBackground, KeyboardAvoidingView, Text, TouchableOpacity } from "react-native";
import { emailValidator } from "../core/utils";
import Logo from "../../components/Logo";
import TextInput from "../../components/TextInput";
import { theme } from "../core/theme";
import Button from "../../components/Button";
import { Navigation } from "../../types";
import { sendEmailWithPassword } from "../../api/auth-api";
import Toast from "../../components/Toast";
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

type Props = {
  navigation: Navigation;
};

const ForgotPasswordScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ value: "", type: "" });
  const colorScheme = useColorScheme();

  const _onSendPressed = async () => {
    if (loading) return;

    const emailError = emailValidator(email.value.toLowerCase());

    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }

    setLoading(true);

    const response = await sendEmailWithPassword(email.value.toLowerCase());

    if (response.error) {
      setToast({ type: "error", value: response.error });
    } else {
      setToast({
        type: "success",
        value: "Email with password has been sent."
      });
    }

    setLoading(false);
  };

  return (
    <ImageBackground style={{ flex: 1, width: "100%", backgroundColor: Colors[colorScheme].background }} >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")} style={styles.backbutton}>
          <Text style={{color: Colors[colorScheme].subtext, fontWeight: "500"}}>← BACK</Text>
        </TouchableOpacity>
        <Logo />
        <Text style={{ color: Colors[colorScheme].loginRegisterForgotPass, fontWeight: "bold", fontSize: 26, marginTop: "5%", marginBottom: "5%" }}>RESTORE PASSWORD</Text>
        <TextInput label="✉️ E-mail address" returnKeyType="done" value={email.value} onChangeText={text => setEmail({ value: text, error: "" })} error={!!email.error} errorText={email.error} autoCapitalize="none" autoCompleteType="email" textContentType="emailAddress" keyboardType="email-address" theme={{ colors: { primary: "#1C1C1C" } }} selectionColor={'#777777'} style={styles.textInput} />
        <Button loading={loading} mode="contained" onPress={_onSendPressed} style={styles.button} color={Colors[colorScheme].login} >
          Send Reset Instructions
      </Button>
        <Toast type={toast.type} message={toast.value} onDismiss={() => setToast({ value: "", type: "" })} />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  textInput: {
    margin: 0,
    marginTop: -10,
    marginBottom: -10,
    height: moderateScale(40),
    fontSize: moderateScale(14)
  },
  back: {
    width: "100%",
    marginTop: 12,
  },
  button: {
    marginTop: 12
  },
  label: {
    color: theme.colors.secondary,
    width: "100%"
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

export default memo(ForgotPasswordScreen);
