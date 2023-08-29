import {StyleSheet} from 'react-native';

const style = ({colors}) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.primary,
      justifyContent: 'space-between',
      flex: 1,
    },
    titleContainer: {
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    title: {
      textAlign: 'center',
    },
    formContainer: {
      backgroundColor: colors.gray,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      paddingBottom: 50,
      padding: 20,
    },
    inputContainer: {
      marginBottom: 30,
      gap: 10,
    },
    forgot: {
      alignItems: 'flex-end',
      marginBottom: 30,
    },
    spaces: {
      padding: 20,
    },
    bottomContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 30,
    },
    innerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      color: colors.gray100,
      fontSize: 14,
      fontWeight: '500',
    },
  });
};
export default style;
