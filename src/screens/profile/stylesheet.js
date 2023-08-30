import {StyleSheet} from 'react-native';

const style = ({colors}) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.secondary,
      justifyContent: 'space-between',
      flex: 1,
    },
    titleContainer: {
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 15,
    },
    title: {
      textAlign: 'center',
      color: colors.title,
    },
    formContainer: {
      backgroundColor: colors.secondary,
      padding: 20,
      marginVertical: 20,
      flex: 1,
      justifyContent: 'space-between',
    },
    photoContainer: {
      alignItems: 'center',
    },
    photo: {
      width: 200,
      height: 200,
      aspectRatio: 1,
      objectFit: 'cover',
      borderRadius: 100,
      borderWidth: 2,
      borderColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputContainer: {
      marginBottom: 30,
      gap: 10,
    },
    spaces: {
      padding: 20,
    },
    bottomContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 30,
    },
    text: {
      fontFamily: 'Kalam-Regular',
      color: colors.gray100,
      fontSize: 15,
      textAlign: 'center',
    },
    link: {
      color: colors.primary,
    },
  });
};
export default style;
