/////////////////////////////////////
// PRIMARY NAVIGATION
/////////////////////////////////////

export type RootStackParamList = {
  Root: undefined;
  AdminRoot: undefined;
  NotFound: undefined;
  AuthLoadingScreen: undefined;
  LoginScreen: undefined;
  ForgotPasswordScreen: undefined;
  RegisterScreen: undefined;
};

export type AuthStackParamList = {
  AuthLoadingScreen: undefined;
  LoginScreen: undefined;
  ForgotPasswordScreen: undefined;
  RegisterScreen: undefined;
};

export type Navigation = {
  navigate: (scene: string) => void;
};

export type AuthDetails = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};

/////////////////////////////////////
// USERS
/////////////////////////////////////
export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

/////////////////////////////////////
// ADMIN
/////////////////////////////////////
export type AdminBottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type AdminTabOneParamList = {
  AdminTabOneScreen: undefined;
};

export type AdminTabTwoParamList = {
  AdminTabTwoScreen: undefined;
};
