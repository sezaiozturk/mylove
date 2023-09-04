import {StyleSheet} from 'react-native';

const style = ({colors}) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.secondary,
      flex: 1,
      backgroundColor: 'green',
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
      justifyContent: 'flex-start',
      paddingHorizontal: 20,
      flex: 1,
    },
    photoContainer: {
      alignItems: 'center',
    },
    photo: {
      borderColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      objectFit: 'cover',
      borderRadius: 100,
      aspectRatio: 1,
      borderWidth: 2,
      height: 175,
      width: 175,
      margin: 10,
    },
    inputContainer: {
      marginBottom: 40,
      gap: 15,
    },
    genderContainer: {
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 50,
    },
    calendarContainer: {
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      flexDirection: 'row',
      gap: 10,
    },
    calendar: {
      marginBottom: 6,
    },
    spaces: {
      padding: 15,
    },
    bottomContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontFamily: 'Kalam-Regular',
      color: colors.gray100,
      textAlign: 'center',
      fontSize: 15,
    },
    link: {
      textDecorationLine: 'underline',
      color: colors.primary,
    },
  });
};
export default style;
