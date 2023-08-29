import {View, Text} from 'react-native';
import React from 'react';
import {Input, Button} from '../../../components';
import {Formik} from 'formik';
import * as Yup from 'yup';
import style from '../stylesheet';
import {useSelector} from 'react-redux';

const ForgotPassword = ({navigation}) => {
  const colors = useSelector(({theme}) => theme.colors);
  const typography = useSelector(({theme}) => theme.typography);
  const classes = style({colors, typography});
  return (
    <View style={classes.container}>
      <View style={classes.titleContainer}>
        <Text style={[classes.title, typography.header1]}>Forgot Password</Text>
      </View>
      <View style={classes.formContainer}>
        <Formik
          initialValues={{
            email: '',
            password: '',
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
              <View style={classes.spaces} />
              <Button title="Send" onPress={handleSubmit}></Button>
            </View>
          )}
        </Formik>
        <View style={[classes.bottomContainer, {marginBottom: 200}]}>
          <View style={classes.innerContainer}>
            <Text style={classes.text}>I remember my password ?</Text>
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

export default ForgotPassword;
