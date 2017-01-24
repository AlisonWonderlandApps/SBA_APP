
import { Platform } from 'react-native';

export const FULL_SCREEN_PADDING = {
  paddingTop: (Platform.OS === 'ios') ? 50 : 30,
  padding: 10
};

export const HEADER = {
  height: (Platform.OS === 'ios') ? 70 : 50,
  padding: (Platform.OS === 'ios') ? 35 : 15,
  icon: 40
};
