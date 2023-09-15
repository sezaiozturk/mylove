import {StyleSheet} from 'react-native';

const style = ({colors}) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      backgroundColor: colors.secondary,
      flex: 1,
    },
    photo: {
      resizeMode: 'cover',
      borderRadius: 5,
      width: 'auto',
      height: 250,
      margin: 5,
    },
    itemContainer: {
      backgroundColor: colors.secondary,
      paddingTop: 10,
    },
    footer: {
      backgroundColor: colors.secondary,
      justifyContent: 'space-between',
      borderColor: colors.text,
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderTopWidth: 1,
      gap: 10,
    },
    text: {
      fontFamily: 'Kalam-Bold',
      color: colors.text,
      fontSize: 15,
    },
  });
};

export default style;
