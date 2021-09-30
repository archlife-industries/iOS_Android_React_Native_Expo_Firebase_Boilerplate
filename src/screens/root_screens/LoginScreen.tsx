import Logo from "../../../components/Logo";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import React, { memo, useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View, ImageBackground, KeyboardAvoidingView } from "react-native";
import { theme } from "../../core/theme";
import { emailValidator, passwordValidator } from "../../core/utils";
import { Navigation } from "../../../types";
import { loginUser } from "../../../api/auth-api";
import Toast from "../../../components/Toast";
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

type Props = {
  navigation: Navigation;
};

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const colorScheme = useColorScheme();

  const _onLoginPressed = async () => {
    if (loading) return;
    const emailError = emailValidator(email.value.toLowerCase());
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    setLoading(true);

    const response = await loginUser({
      email: email.value.toLowerCase(),
      password: password.value
    });

    if (response.error) {
      setError(response.error);
    }

    setLoading(false);
  };

  return (
    <ImageBackground style={{ flex: 1, width: "100%", backgroundColor: Colors[colorScheme].background }} >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Logo />
        <Text style={{color: Colors[colorScheme].loginRegisterForgotPass, fontWeight: "bold", fontSize: moderateScale(30), marginTop: "5%", marginBottom: "5%"}} numberOfLines={1} adjustsFontSizeToFit>WELCOME BACK</Text>
        <TextInput label="✉️ Email" returnKeyType="next" value={email.value} onChangeText={text => setEmail({ value: text, error: "" })} error={!!email.error} errorText={email.error} autoCapitalize="none" autoCompleteType="email" textContentType="emailAddress" keyboardType="email-address" theme={{ colors: { primary: "#1C1C1C" } }} selectionColor={'#777777'} style={styles.textInput} />
        <TextInput label="🔑 Password" returnKeyType="done" value={password.value} onChangeText={text => setPassword({ value: text, error: "" })} error={!!password.error} errorText={password.error} secureTextEntry autoCapitalize="none" theme={{ colors: { primary: "#1C1C1C" } }} selectionColor={'#777777'} style={styles.textInput} />
        <View style={styles.forgotPassword}>
          <TouchableOpacity onPress={() => navigation.navigate("ForgotPasswordScreen")} >
            <Text style={{fontSize: moderateScale(14), color: Colors[colorScheme].subtext, fontWeight: "bold", marginTop: "1%"}}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
        <Button loading={loading} color={Colors[colorScheme].login} mode="contained" onPress={_onLoginPressed}>Login</Button>
        <View style={styles.row}>
          <Text style={{fontSize: moderateScale(14), color: Colors[colorScheme].subtext, marginRight: "2%", fontWeight: "bold", marginTop: moderateScale(17)}}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
            <Text style={{ fontSize: moderateScale(14), fontWeight: "bold", color: Colors[colorScheme].signup, marginTop: moderateScale(17) }}>Sign up</Text>
          </TouchableOpacity>
        </View>
        <Toast message={error} onDismiss={() => setError("")} />
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
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24
  },
  row: {
    flexDirection: "row",
    marginTop: 4
  },
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default memo(LoginScreen);