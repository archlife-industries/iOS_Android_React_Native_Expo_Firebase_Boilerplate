import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const Logo = () => (
  <Image source={require('../assets/images/adaptive-icon.png')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: scale(125),
    height:  scale(125),
    marginBottom: 0,
    marginTop: "-30%"
  },
});

export default memo(Logo);
