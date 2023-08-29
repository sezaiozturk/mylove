import {StyleSheet} from 'react-native';

const style = ({colors}) => {
  const base_style = StyleSheet.create({
    container: {
      justifyContent: 'center',
      paddingHorizontal: 20,
      alignItems: 'center',
      flexDirection: 'row',
      paddingVertical: 10,
      textAlign: 'center',
      borderRadius: 20,
      gap: 15,
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
        paddingHorizontal: 15,
      },
      title: {
        ...base_style.title,
        fontSize: 12,
      },
    }),
  };
};
export default style;
