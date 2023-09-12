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
      height: 250,
      width: 'auto',
      resizeMode: 'cover',
      margin: 5,
      borderRadius: 20,
    },
    itemContainer: {
      backgroundColor: colors.secondary,
      paddingTop: 10,
    },
    footer: {
      borderTopWidth: 1,
      borderColor: colors.text,
      backgroundColor: colors.secondary,
      flexDirection: 'row',
      gap: 10,
      paddingHorizontal: 20,
      paddingVertical: 15,
    },
    text: {
      fontSize: 15,
      fontFamily: 'Kalam-Bold',
      color: colors.text,
    },
  });
};

export default style;
