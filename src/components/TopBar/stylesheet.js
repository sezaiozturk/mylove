import {StyleSheet} from 'react-native';

const style = ({colors}) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.primary,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      padding: 15,
    },
    title: {
      color: colors.secondary,
    },
  });
};

export default style;
