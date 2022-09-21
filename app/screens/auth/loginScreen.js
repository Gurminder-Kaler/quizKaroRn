import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
//import RequiredSign from '../../utils/requiredSign';
import {loginUser} from '../../actions/authAction';
import {useDispatch} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';

let validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email('Not a valid email.')
    .required('Email is required.'),
  password: Yup.string()
    .required('Password is required.')
    .min(6, 'Password should be more than 5 characters.'),
});
export const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  // let formObject = {email: '', password: ''};
  let formObject = {email: 'test@yopmail.com', password: '12345678'};

  let performLogin = async values => {
    let payload = {
      email: values.email,
      password: values.password,
    };
    let response = await dispatch(loginUser(payload));
    if (response && response.success) {
      navigation.navigate('homeScreen');
      AsyncStorage.setItem('userToken', response.token);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.body}>
      <Formik
        initialValues={formObject}
        validationSchema={validationSchema}
        onSubmit={(values, formikActions) => {
          performLogin(values);
        }}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => {
          let {email, password} = values;
          return (
            <>
              <View style={styles.body}>
                <View style={styles.imageView}>
                  <Image
                    source={require('../../../assets/images/image2.jpg')}
                    style={styles.image}
                  />
                </View>

                <View style={styles.brandView}>
                  <Text style={[styles.brandText, styles.shadowSm]}>
                    Quizkaro
                  </Text>
                </View>
                <View style={styles.welcomeView}>
                  <Text style={styles.welcomeText}>
                    Welcome back, log in into your account
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
                <View style={styles.inputBox}>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    secureTextEntry={true}
                    placeholder="Password"
                  />
                  {touched.password && errors.password ? (
                    <Text style={styles.error}>{errors.password}</Text>
                  ) : (
                    ''
                  )}
                </View>
                <View style={[styles.button, styles.shadowSm]}>
                  <TouchableOpacity
                    onPress={
                      isSubmitting == false ? handleSubmit : handleSubmit
                    }>
                    <Text style={styles.buttonText}>Login</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.inputBox}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('forgotPasswordScreen')}>
                    <Text style={styles.forgotPasswordText}>
                      Reset Password
                    </Text>
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
    backgroundColor: '#2a2a2a02',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 16,
    backgroundColor: 'white',
  },
  imageView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    backgroundColor: 'teal',
    height: 150,
    width: 150,
  },
  brandView: {
    padding: 2,
  },
  brandText: {
    fontSize: 48,
    textAlign: 'center',
    letterSpacing: 4,
    color: '#008B8B',
    fontFamily: 'Pacifico-Regular',
  },
  welcomeView: {
    margin: 4,
    padding: 4,
  },
  welcomeText: {
    color: '#7F8487',
    textAlign: 'center',
  },
  inputBox: {
    margin: 5,
    padding: 10,
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
  shadowSm: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 16,
    letterSpacing: 0.5,
    fontWeight: '500',
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
  },
  forgotPasswordText: {
    fontSize: 14,
    textAlign: 'center',
    color: 'tomato',
  },
});
export default LoginScreen;
