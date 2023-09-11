import {StyleSheet} from 'react-native';

const style = ({colors}) => {
  const base_style = StyleSheet.create({
    container: {
      shadowOffset: {width: 0, height: 10},
      backgroundColor: 'gray',
      paddingHorizontal: 20,
      shadowColor: 'black',
      paddingVertical: 12,
      borderRadius: 15,
      elevation: 10,
      marginHorizontal: 8,
      marginVertical: 6,
    },
    task: {
      color: colors.title,
    },
  });
  return {
    yes: StyleSheet.create({
      ...base_style,
      container: {
        ...base_style.container,
        backgroundColor: '#97FF9B',
      },
    }),
    no: StyleSheet.create({
      ...base_style,
      container: {
        ...base_style.container,
        backgroundColor: '#FF6767',
      },
    }),
    wait: StyleSheet.create({
      ...base_style,
      container: {
        ...base_style.container,
        backgroundColor: '#F9F479',
      },
    }),
    complete: StyleSheet.create({
      ...base_style,
      container: {
        ...base_style.container,
        backgroundColor: '#D0D0D0',
      },
      task: {
        ...base_style.task,
        textDecorationLine: 'line-through',
      },
    }),
  };
};

export default style;
