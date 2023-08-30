import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Input, Button} from '../../../components';
import {Formik} from 'formik';
import style from '../stylesheet';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {loginSchema} from '../validationSchema';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const colors = useSelector(({theme}) => theme.colors);
  const typography = useSelector(({theme}) => theme.typography);
  const classes = style({colors, typography});
  const [load, setLoad] = useState(false);
  return (
    <View style={classes.container}>
      <View style={classes.titleContainer}>
        <Text style={[classes.title, typography.header1]}>Login</Text>
      </View>
      <View style={classes.formContainer}>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={loginSchema}
          onSubmit={async ({email, password}) => {
            setLoad(true);
            try {
              AsyncStorage.getItem(email).then(result => {
                result === 1
                  ? navigation.navigate('HomeTab')
                  : navigation.navigate('ProfileScreen');
              });
              await auth().signInWithEmailAndPassword(email, password);

              setLoad(false);
            } catch (e) {
              console.log(e);
              setLoad(false);
            }
          }}>
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
              <View style={classes.forgot}>
                <Button
                  title="Forgot Password ?"
                  variant="ghost"
                  spreadBehavior="baseline"
                  onPress={() => navigation.navigate('ForgotScreen')}
                />
              </View>
              <Button
                title="Login"
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
            <Text style={classes.text}>Don’t have an account?</Text>
            <Button
              title={'Signup'}
              variant="ghost"
              onPress={() => navigation.navigate('SignupScreen')}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;
