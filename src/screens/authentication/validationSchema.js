import {View, Text} from 'react-native';
import React from 'react';
import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
});

export const signupSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null])
    .required(),
});

export const forgotSchema = Yup.object().shape({
  email: Yup.string().email().required(),
});

export const nameSchema = Yup.object().shape({
  name: Yup.string().required(),
  dateOfBirth: Yup.string().required(),
});
