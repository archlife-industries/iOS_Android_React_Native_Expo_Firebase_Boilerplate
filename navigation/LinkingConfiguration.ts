import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: 'User One',
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'User Two',
            },
          },
        },
      },
      AdminRoot: {
        screens: {
          AdminTabOne: {
            screens: {
              AdminTabOneScreen: 'Admin One',
            },
          },
          AdminTabTwo: {
            screens: {
              AdminTabTwoScreen: 'Admin Two',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
