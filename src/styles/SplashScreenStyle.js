
import { PRIMARY_COLOUR } from '../global/colours';

const SplashScreenStyle = {
    containerStyle: {
      flex: 1,
      padding: 10,
      paddingTop: 0,
      backgroundColor: PRIMARY_COLOUR
    },
    imageStyle: {
      resizeMode: 'contain',
      transform: [{ scale: 0.85 }],
      flexGrow: 0.5,
      width: null,
      height: null,
      minWidth: 100,
      minHeight: 100,
      maxWidth: 500,
      maxHeight: 600
  }
};

export { SplashScreenStyle };
