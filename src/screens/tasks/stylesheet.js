import {StyleSheet} from 'react-native';

const style = ({colors}) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.secondary,
      flex: 1,
    },
    heart: {
      width: 50,
      height: 50,
    },
    float: {
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      borderRadius: 30,
      height: 60,
      bottom: 15,
      width: 60,
      right: 15,
    },
    infoContainer: {
      backgroundColor: 'rgba(0,0,0,0.75)',
      justifyContent: 'center',
      flex: 1,
    },
    infoDialog: {
      backgroundColor: colors.secondary,
      paddingHorizontal: 10,
      paddingVertical: 20,
      borderRadius: 20,
      margin: 20,
      gap: 10,
    },
    title: {
      color: colors.primary,
      textAlign: 'center',
    },
    inputContainer: {
      backgroundColor: 'rgba(0,0,0,0.75)',
      justifyContent: 'flex-end',
      flex: 1,
    },
    inputDialog: {
      backgroundColor: colors.secondary,
      justifyContent: 'space-between',
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      paddingHorizontal: 25,
      paddingVertical: 20,
      height: 300,
    },
    optionsContainer: {
      backgroundColor: 'rgba(0,0,0,0.75)',
      justifyContent: 'center',
      flex: 1,
    },
  });
};

export default style;
