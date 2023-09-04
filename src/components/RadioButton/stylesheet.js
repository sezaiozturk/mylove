import {StyleSheet} from 'react-native';

const style = ({colors}) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: 5,
    },
    circle: {
      borderColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      borderWidth: 2,
      height: 20,
      width: 20,
    },
    innerCircle: {
      backgroundColor: colors.primary,
      height: 10,
      width: 10,
      borderRadius: 5,
    },
    title: {
      color: colors.text,
    },
  });
};
export default style;
