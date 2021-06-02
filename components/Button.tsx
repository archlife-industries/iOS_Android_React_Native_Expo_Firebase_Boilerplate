import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { theme } from "../src/core/theme";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

type Props = React.ComponentProps<typeof PaperButton>;

const Button = ({ mode, style, children, ...props }: Props) => (
  <PaperButton
    style={[
      styles.button,
      mode === "outlined" && { backgroundColor: theme.colors.surface },
      style
    ]}
    labelStyle={[
      styles.text,
      mode === "contained" && { color: theme.colors.surface }
    ]}
    mode={mode}
    {...props}
  >
    {children}
  </PaperButton>
);

const styles = StyleSheet.create({
  button: {
    width: "100%",
    marginVertical: 0,
  },
  text: {
    fontWeight: "bold",
    fontSize: moderateScale(13),
  }
});

export default memo(Button);
