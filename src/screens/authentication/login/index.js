import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Input, Button} from '../../../components';
import {Formik} from 'formik';
import style from '../stylesheet';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {loginSchema} from '../validationSchema';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  setUser1Info,
  setUser2Info,
  setMatchInfo,
} from '../../../redux/users/usersSlice';

const Login = ({navigation}) => {
  const colors = useSelector(({theme}) => theme.colors);
  const typography = useSelector(({theme}) => theme.typography);
  const classes = style({colors, typography});
  const [load, setLoad] = useState(false);
  const match = useSelector(({users}) => users.matchInfo);
  let currentUser = null;
  const dispatch = useDispatch();

  const accountControl = async currentUser => {
    const response = await firestore()
      .collection('User')
      .doc(currentUser.uid)
      .get();
    //console.log(response);
    if (response._data.matchId === undefined) {
      navigation.navigate('ProfileScreen');
    } else {
      //initial homeTab screen
      getInfo(response._data);
    }
    setLoad(false);
  };
  const getInfo = async data => {
    let response;
    response = await firestore().collection('Match').doc(data.matchId).get();
    const match = response._data;
    const user2Id = match.uid1 == currentUser.uid ? match.uid2 : match.uid1;

    response = await firestore().collection('User').doc(user2Id).get();

    //dispatch(setMatchId(data.matchId));
    //dispatch(setUser1Id(currentUser.uid));
    //dispatch(setUser2Id(user2Id));
    dispatch(setMatchInfo(match));
    dispatch(setUser1Info(data));
    dispatch(setUser2Info(response._data));
    navigation.navigate('HomeTab');
  };

  const handleLogin = async ({email, password}) => {
    setLoad(true);
    try {
      const isLogin = await auth().signInWithEmailAndPassword(email, password);
      if (isLogin) {
        currentUser = auth().currentUser;
        accountControl(currentUser);
      }
    } catch (e) {
      console.log(e);
      setLoad(false);
    }
  };

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
          onSubmit={handleLogin}>
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
