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
  let formObject = {email: 'gold@gmail.com', password: '12345679'};

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
                  <Text style={styles.label}>
                    Enter your password
                    <RequiredSign />
                  </Text>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    secureTextEntry={true}
                  />
                  {touched.password && errors.password ? (
                    <Text style={styles.error}>{errors.password}</Text>
                  ) : (
                    ''
                  )}
                </View>
                <View style={styles.inputBox}>
                  <TouchableOpacity
                    onPress={
                      isSubmitting == false ? handleSubmit : handleSubmit
                    }>
                    <Text style={styles.button}> <AntDesign name="login" size={25} color={'white'} />&nbsp;Login</Text>
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

                <View style={styles.inputBox}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('forgotPasswordScreen')}>
                    <Text style={styles.forgotPasswordText}>
                      Forgot Password?
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
  forgotPasswordText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#ff000092',
  },
});
export default LoginScreen;
