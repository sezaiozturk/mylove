import {StyleSheet} from 'react-native';

const style = ({colors}) => {
  return StyleSheet.create({
    optionsDialogContainer: {
      alignItems: 'flex-end',
    },
    optionsDialog: {
      backgroundColor: colors.secondary,
      borderRadius: 20,
      marginHorizontal: 6,
    },
    option: {
      color: colors.primary,
      textAlign: 'left',
      paddingLeft: 25,
      paddingRight: 100,
      paddingVertical: 15,
    },
    seperator: {
      backgroundColor: 'white',
      height: 1,
    },
  });
};

export default style;
