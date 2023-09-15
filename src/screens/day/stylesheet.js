import {StyleSheet} from 'react-native';

const style = ({colors}) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.secondary,
      flex: 1,
    },
    photoContainer: {
      justifyContent: 'center',
      flexDirection: 'row',
      marginTop: 15,
      gap: 30,
    },
    photo: {
      borderColor: colors.primary,
      borderRadius: 75,
      borderWidth: 2,
      height: 150,
      width: 150,
    },
    dayContainer: {
      alignItems: 'center',
      padding: 30,
      gap: 30,
    },
    day: {
      color: colors.primary,
      fontSize: 70,
    },
    sentenceContainer: {
      paddingVertical: 50,
    },
    text: {
      paddingHorizontal: 40,
      color: colors.primary,
      textAlign: 'center',
      lineHeight: 30,
    },
  });
};

export default style;
