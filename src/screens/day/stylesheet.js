import {StyleSheet} from 'react-native';

const style = ({colors}) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.secondary,
      paddingHorizontal: 40,
      flex: 1,
    },
    photoContainer: {
      justifyContent: 'center',
      flexDirection: 'row',
    },
    maskedContainer: {
      flex: 1,
      flexDirection: 'row',
      height: '100%',
    },
    masked: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    heart: {
      width: 150,
      height: 150,
    },
    photo: {
      width: 175,
      height: 175,
      borderRadius: 75,
      borderColor: colors.primary,
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
      color: colors.primary,
      textAlign: 'center',
      lineHeight: 30,
    },
  });
};

export default style;
