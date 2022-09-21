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
import {updatePassword} from '../../actions/authAction';
import {useDispatch} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-community/async-storage';

let validationSchema = Yup.object({
  password: Yup.string()
    .trim()
    .min(8, 'Password is too short!')
    .required('Password is required!'),
  confirmPassword: Yup.string()
    .trim()
    .required('Confirm password is required!')
    .equals([Yup.ref('password'), null], 'Passwords does not match eachother!'),
});
export const UpdatePasswordScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  let formObject = {confirmPassword: '', password: ''};

  let performLogin = async values => {
    let payload = {
      password: values.password,
      confirmPassword: values.confirmPassword,
      email: route.params.email,
    };

    let response = await dispatch(updatePassword(payload));
    if (response && response.success) {
      console.log('forpassscreen 0000 0 00 0 0');
      navigation.navigate('loginScreen');
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
                    Enter your new password
                    <RequiredSign />
                  </Text>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    placeholder={'Enter Your Password'}
                    secureTextEntry={true}
                  />
                  {touched.password && errors.password ? (
                    <Text style={styles.error}>{errors.password}</Text>
                  ) : (
                    ''
                  )}
                </View>

                <View style={styles.inputBox}>
                  <Text style={styles.label}>
                    Confirm the new password <RequiredSign />
                  </Text>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    placeholder={'Enter Your confirmPassword'}
                    secureTextEntry={true}
                  />
                  {touched.confirmPassword && errors.confirmPassword ? (
                    <Text style={styles.error}>{errors.confirmPassword}</Text>
                  ) : (
                    ''
                  )}
                </View>

                <View style={styles.inputBox}>
                  <TouchableOpacity
                    onPress={
                      isSubmitting == false ? handleSubmit : handleSubmit
                    }>
                    <Text style={styles.button}>Update Password</Text>
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
  extraInputBox : {
    margin: 35
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
export default UpdatePasswordScreen;
