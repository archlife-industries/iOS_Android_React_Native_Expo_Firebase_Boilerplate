// IMPORT DEPENDENCIES
import React, { memo, useState, useEffect } from "react";
import { ImageBackground, ActivityIndicator } from "react-native";
import firebase from "firebase/app";
import "firebase/auth";
import { Navigation } from "../../../types";
import { theme } from "../../core/theme";
import { FIREBASE_CONFIG } from "../../core/config";

// Initialize Firebase
firebase.initializeApp(FIREBASE_CONFIG);

type Props = {
  navigation: Navigation;
};

const AuthLoadingScreen = ({ navigation }: Props) => {

  firebase.auth().onAuthStateChanged(user => {

    // If user is logged in...
    if (user) {
      const userEmail = firebase.auth().currentUser.email;
      var userType = '...'
      firebase.firestore().collection('users').doc(userEmail).get().then(documentSnapshot => {
        if (documentSnapshot.exists) {
          userType = documentSnapshot.get("userType");
          // USER
          if (userType === "user") {
            navigation.navigate("Root");
          }
          // ADMIN
          if (userType === "admin") {
            navigation.navigate("AdminRoot");
          }
        };
      });
    }
    // If user is NOT logged in...
    else {
      navigation.navigate("LoginScreen");
    }
  });

  return (
    <ImageBackground style={{ flex: 1, width: "100%", backgroundColor: "#1C1C1C" }} >
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </ImageBackground>
  );
};

export default memo(AuthLoadingScreen);
