import {StyleSheet} from 'react-native';

const style = ({colors}) => {
  return StyleSheet.create({
    container: {
      gap: 5,
    },
    inputContainer: {
      justifyContent: 'space-between',
      borderColor: colors.primary,
      paddingHorizontal: 10,
      alignItems: 'center',
      flexDirection: 'row',
      paddingVertical: 5,
      borderRadius: 10,
      borderWidth: 2,
      gap: 8,
    },
    title: {
      color: colors.primary,
      fontSize: 12,
    },
    input: {
      color: 'black',
      fontSize: 14,
      padding: 0,
      flex: 1,
    },
    error: {
      color: 'black',
    },
  });
};
export default style;
