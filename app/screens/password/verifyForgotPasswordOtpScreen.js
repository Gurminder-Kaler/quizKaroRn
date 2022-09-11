import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import RequiredSign from '../../utils/requiredSign';
import {
  verifyForgotPasswordOTP,
  sendForgotPasswordOTPEmail,
} from '../../actions/authAction';
import {useDispatch} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Formik} from 'formik';
import * as Yup from 'yup';
import showSnack from '../../utils/showSnack';
// import AsyncStorage from '@react-native-community/async-storage';

let validationSchema = Yup.object({
  otp: Yup.number()
    .min(1, 'Must be 6 digits')
    .max(999999, 'Must be 6 digits')
    .required('OTP is required'),
});
export const VerifyForgotPasswordOtpScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  let formObject = {otp: ''};

  let verifyForgotPasswordOTPAction = async values => {
    let payload = {
      otp: values.otp,
      email: route.params.email,
    };

    let response = await dispatch(verifyForgotPasswordOTP(payload));
    if (response && response.success) {
      navigation.navigate('updatePasswordScreen', {email: route.params.email});
    }
  };

  let resendOtp = async values => {
    let payload = {
      email: route.params.email,
    };

    let response = await dispatch(sendForgotPasswordOTPEmail(payload));
    if (response && response.success) {
      showSnack('OTP resent on the email, please check!');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.body}>
      <Formik
        initialValues={formObject}
        validationSchema={validationSchema}
        onSubmit={(values, formikActions) => {
          verifyForgotPasswordOTPAction(values);
        }}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          let {otp} = values;
          return (
            <>
              <View style={styles.body}>
                <View style={styles.inputBox}>
                  <Text style={styles.label}>OTP sent at <Text style={styles.greenText}>{route.params.email}</Text></Text>
                </View>
                <View style={styles.inputBox}>
                  <Text style={styles.label}>
                    Enter your OTP
                    <RequiredSign />
                  </Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={handleChange('otp')}
                    onBlur={handleBlur('otp')}
                    autoCapitalize="none"
                  />
                  {touched.otp && errors.otp ? (
                    <Text style={styles.error}>{errors.otp}</Text>
                  ) : (
                    ''
                  )}
                </View>
                <View style={styles.inputBox}>
                  <TouchableOpacity onPress={handleSubmit}>
                    <Text style={styles.button}>
                      <AntDesign name="check" size={30} color={'white'} />
                      &nbsp;Verify OTP
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.inputBox}>
                  <TouchableOpacity
                    onPress={() => resendOtp(route.params.email)}>
                    <Text style={styles.resendButton}>
                      <AntDesign name="retweet" size={30} color={'white'} />
                      &nbsp;Resend OTP
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.inputBox}>
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
  error: {
    color: 'red',
    fontSize: 15,
  },
  greenText: {
    color: 'green',
    fontSize: 20,
    fontWeight: "bold"
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
  resendButton: {
    padding: 10,
    fontSize: 24,
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
  },
  bottomText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
export default VerifyForgotPasswordOtpScreen;
