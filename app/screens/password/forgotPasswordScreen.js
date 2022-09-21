import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import RequiredSign from '../../utils/requiredSign';
import {sendForgotPasswordOTPEmail} from '../../actions/authAction';
import {useDispatch} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';

let validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email('Not a valid email.')
    .required('Email is required.'),
});
export const ForgotPasswordScreen = ({navigation}) => {
  const dispatch = useDispatch();
  let formObject = {email: ''};

  let sendForgotPasswordOTPEmailAction = async values => {
    let payload = {
      email: values.email,
    };
    let response = await dispatch(sendForgotPasswordOTPEmail(payload));
    if (response && response.success) {
      navigation.navigate('verifyForgotPasswordOtpScreen', {
        email: values.email,
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.body}>
      <Formik
        initialValues={formObject}
        validationSchema={validationSchema}
        onSubmit={(values, formikActions) => {
          sendForgotPasswordOTPEmailAction(values);
        }}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          let {email} = values;
          return (
            <>
              <View style={styles.body}>

                <View style={styles.inputBox}>
                  <Text style={styles.label}>
                    Enter your email
                    <RequiredSign />
                  </Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    autoCapitalize="none"
                  />
                  {touched.email && errors.email ? (
                    <Text style={styles.error}>{errors.email}</Text>
                  ) : (
                    ''
                  )}
                </View>

                <View style={styles.inputBox}>
                  <TouchableOpacity onPress={handleSubmit}>
                    <Text style={styles.button}>
                      <MaterialCommunityIcons name="onepassword" size={25} color={'white'} />
                      &nbsp;Send OTP on this email
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.extraInputBox}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('registerScreen')}>
                    <Text style={styles.bottomText}>
                      New Member? Register now
                    </Text>
                  </TouchableOpacity>
                </View>
                
              </View>
            </>
          );
        }}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#2a2a2a02',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 16,
  },
  required: {
    color: 'red',
  },
  label: {
    fontSize: 19,
  },
  inputBox: {
    margin: 5,
    padding: 5,
  },
  extraInputBox: {
    margin: 25,
  },
  error: {
    color: 'red',
    fontSize: 15,
  },
  input: {
    borderColor: '#00000043',
    borderWidth: 1,
    textAlign: 'left',
    fontSize: 23,
    borderRadius: 5,
    padding: 5,
    margin: 5,
  },
  button: {
    padding: 10,
    fontSize: 24,
    backgroundColor: 'green',
    color: 'white',
    textAlign: 'center',
  },
  bottomText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
export default ForgotPasswordScreen;
