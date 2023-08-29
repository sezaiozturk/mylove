import {View, Text} from 'react-native';
import React from 'react';
import {Input, Button} from '../../../components';
import {Formik} from 'formik';
import * as Yup from 'yup';
import style from '../stylesheet';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Signup = ({navigation}) => {
  const colors = useSelector(({theme}) => theme.colors);
  const typography = useSelector(({theme}) => theme.typography);
  const classes = style({colors, typography});
  return (
    <View style={classes.container}>
      <View style={classes.titleContainer}>
        <Text style={[classes.title, typography.header1]}>Signup</Text>
      </View>
      <View style={classes.formContainer}>
        <Formik
          initialValues={{
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
          })}
          onSubmit={values => console.log(values)}>
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            errors,
          }) => (
            <View style={classes.inputContainer}>
              <Input
                title={'Email'}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                touched={touched.email}
                errors={errors.email}
                placeHolder={'center e mail'}
              />
              <Input
                title={'Password'}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                touched={touched.password}
                errors={errors.password}
                placeHolder={'center password'}
                secureTextEntry={true}
              />
              <Input
                title={'Confirm Password'}
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                touched={touched.password}
                errors={errors.password}
                placeHolder={'center password'}
                secureTextEntry={true}
              />
              <View style={classes.spaces} />
              <Button title="Signup" onPress={handleSubmit}></Button>
            </View>
          )}
        </Formik>
        <View style={classes.bottomContainer}>
          <Text style={classes.text}>Log in with existing account?</Text>
          <Text>
            <Icon name="google" size={30} color={'black'} />
          </Text>
          <View style={classes.innerContainer}>
            <Text style={classes.text}>Already have an account?</Text>
            <Button
              title={'Login'}
              variant="ghost"
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Signup;
