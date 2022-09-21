import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {sendForgotPasswordOTPEmail} from '../../actions/authAction';
import {useDispatch} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import AsyncStorage from '@react-native-community/async-storage';

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
    console.log('Reseposne as,dasjkdjsakd', response);
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
                <View style={styles.imageView}>
                  <Image
                    source={require('../../../assets/images/forgotpassword.jpg')}
                    style={styles.image}
                  />
                </View>
                <View style={styles.textView}>
                  <Text style={styles.text}>
                    Don't worry, happens to the best of us
                  </Text>
                </View>
                <View style={styles.inputBox}>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    autoCapitalize="none"
                    placeholder="Email"
                  />
                  {touched.email && errors.email ? (
                    <Text style={styles.error}>{errors.email}</Text>
                  ) : (
                    ''
                  )}
                </View>

                <View style={[styles.button, styles.shadowSm]}>
                  <TouchableOpacity onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Send OTP</Text>
                  </TouchableOpacity>
                </View>

                <View style={[styles.inputBox, styles.signUpView]}>
                  <Text style={styles.bottomText}>Don't have an account ?</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('registerScreen')}>
                    <Text style={styles.signUp}>Sign Up</Text>
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
    backgroundColor: 'white',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 16,
  },
  imageView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  textView: {
    margin: 4,
    padding: 4,
  },
  text: {
    color: '#7F8487',
    textAlign: 'center',
  },
  image: {
    backgroundColor: 'teal',
    height: 150,
    width: 150,
  },
  inputBox: {
    margin: 5,
    padding: 10,
  },
  extraInputBox: {
    margin: 25,
  },
  error: {
    color: 'tomato',
    fontSize: 14,
    padding: 5,
    marginTop: 4,
  },
  input: {
    textAlign: 'left',
    fontSize: 20,
    borderRadius: 2,
    padding: 10,
    color: '#413F42',
    borderColor: '#413F42',
    borderWidth: 0.5,
    fontFamily: 'Raleway-Regular',
  },
  button: {
    marginHorizontal: 15,
    padding: 15,
    backgroundColor: '#008B8B',
    borderRadius: 2,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  shadowSm: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  bottomText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#7F8487',
  },
  signUp: {
    fontWeight: '700',
    color: '#008B8B',
    marginLeft: 4,
  },
  signUpView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
});
export default ForgotPasswordScreen;
