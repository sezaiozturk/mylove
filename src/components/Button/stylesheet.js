import {StyleSheet} from 'react-native';

const deneme = ({colors}) => {
  const base_style = StyleSheet.create({
    container: {
      textAlign: 'center',
      alignItems: 'center',
      marginHorizontal: 20,
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    title: {
      color: colors.primary,
      fontWeight: '500',
    },
  });
  return {
    filled: StyleSheet.create({
      ...base_style,
      container: {
        ...base_style.container,
        backgroundColor: colors.primary,
      },
      title: {
        ...base_style.title,
        color: colors.text,
      },
    }),
    outlined: StyleSheet.create({
      ...base_style,
      container: {
        ...base_style.container,
        backgroundColor: 'transparent',
        borderColor: colors.primary,
        borderWidth: 2,
      },
    }),
    ghost: StyleSheet.create({
      ...base_style,
      container: {
        ...base_style.container,
        backgroundColor: 'transparent',
        paddingHorizontal: 30,
      },
    }),
  };
};
export default deneme;
