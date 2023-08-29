import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Input, Button} from '../../../components';
import {Formik} from 'formik';
import style from '../stylesheet';
import {useSelector} from 'react-redux';
import {forgotSchema} from '../validationSchema';
import auth from '@react-native-firebase/auth';

const ForgotPassword = ({navigation}) => {
  const colors = useSelector(({theme}) => theme.colors);
  const typography = useSelector(({theme}) => theme.typography);
  const classes = style({colors, typography});
  const [load, setLoad] = useState(false);
  return (
    <View style={classes.container}>
      <View style={classes.titleContainer}>
        <Text style={[classes.title, typography.header1]}>Forgot Password</Text>
      </View>
      <View style={classes.formContainer}>
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={forgotSchema}
          onSubmit={async ({email}) => {
            setLoad(true);
            try {
              await auth().sendPasswordResetEmail(email);
              navigation.navigate('LoginScreen');
              setLoad(false);
            } catch (e) {
              setLoad(false);
              console.log(e);
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
              <View style={classes.spaces} />
              <Button
                title="Send"
                onPress={handleSubmit}
                loading={load}></Button>
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
