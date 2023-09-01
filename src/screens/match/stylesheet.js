import {StyleSheet} from 'react-native';

const style = ({colors}) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.secondary,
      paddingHorizontal: 20,
      flex: 1,
    },
    qrContainer: {
      justifyContent: 'center',
      paddingTop: 50,
      gap: 50,
    },
    qr: {
      alignItems: 'center',
    },
    scannerContainer: {
      marginBottom: 50,
    },
    row: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      paddingVertical: 30,
      gap: 15,
    },
    uid: {
      backgroundColor: colors.primary,
      textAlign: 'center',
      borderRadius: 10,
      color: 'black',
      padding: 10,
      flex: 1,
    },
    seperatorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 20,
    },
    seperator: {
      backgroundColor: colors.primary,
      height: 2,
      flex: 1,
    },
    or: {
      marginHorizontal: 5,
      color: colors.text,
    },
    statement: {
      textAlign: 'center',
      color: colors.text,
      lineHeight: 25,
    },
    cameraContainer: {
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute',
      paddingVertical: 40,
      height: '100%',
      width: '100%',
      zIndex: 1000,
    },
    title: {
      backgroundColor: 'rgba(0,0,0,0.75)',
      borderRadius: 10,
      color: 'white',
      padding: 10,
    },
    close: {
      backgroundColor: 'rgba(0,0,0,0.75)',
      borderRadius: 50,
      padding: 10,
    },
  });
};
export default style;
