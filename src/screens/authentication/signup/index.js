import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Input, Button} from '../../../components';
import {Formik} from 'formik';
import style from '../stylesheet';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {signupSchema} from '../validationSchema';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = ({navigation}) => {
  const colors = useSelector(({theme}) => theme.colors);
  const typography = useSelector(({theme}) => theme.typography);
  const classes = style({colors, typography});
  const [load, setLoad] = useState(false);

  const handleSignup = ({email, password}) => {
    setLoad(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        AsyncStorage.setItem(email, 0);
        navigation.navigate('LoginScreen');
        setLoad(false);
      })
      .catch(error => {
        setLoad(false);
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error);
      });
  };
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
          validationSchema={signupSchema}
          onSubmit={handleSignup}>
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
                touched={touched.confirmPassword}
                errors={errors.confirmPassword}
                placeHolder={'center password'}
                secureTextEntry={true}
              />
              <View style={classes.spaces} />
              <Button
                title="Signup"
                onPress={handleSubmit}
                loading={load}></Button>
            </View>
          )}
        </Formik>
        <View style={classes.bottomContainer}>
          <Text style={classes.text}>Log in with existing account?</Text>
          <Text>
            <Icon name="google" size={30} color={colors.gray200} />
          </Text>
          <View style={classes.innerContainer}>
            <Text style={classes.text}>Already have an account?</Text>
            <Button
              title={'Login'}
              variant="ghost"
              onPress={() => navigation.navigate('LoginScreen')}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Signup;
