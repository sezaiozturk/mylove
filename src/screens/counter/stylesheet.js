import {StyleSheet} from 'react-native';

const style = ({colors}) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.secondary,
      alignItems: 'center',
      padding: 20,
      flex: 1,
    },
    circle: {
      justifyContent: 'space-between',
      backgroundColor: colors.indicator,
      borderColor: colors.primary,
      alignItems: 'center',
      borderRadius: 90,
      borderWidth: 10,
      height: 180,
      width: 180,
    },
    day: {
      color: colors.primary,
      marginTop: 25,
      fontSize: 60,
    },
    ratio: {
      color: colors.primary,
      fontWeight: '600',
      marginBottom: 25,
      fontSize: 16,
    },
    row: {
      flexDirection: 'row',
      marginTop: 40,
      gap: 30,
    },
    column: {
      alignItems: 'center',
      gap: 5,
    },
    number: {
      color: colors.primary,
      fontWeight: '600',
      fontSize: 36,
    },
    title: {
      color: colors.primary,
    },
  });
};
export default style;
