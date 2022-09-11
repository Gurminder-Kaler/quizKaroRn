import React, {useEffect} from 'react';
import isEmpty from './app/validations/isEmpty';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from './app/screens/welcomeScreen';
import ProfileScreen from './app/screens/profile/profileScreen';
import UpdatePasswordScreen from './app/screens/password/updatePasswordScreen';
import ForgotPasswordScreen from './app/screens/password/forgotPasswordScreen';
import VerifyForgotPasswordOtpScreen from './app/screens/password/verifyForgotPasswordOtpScreen';
import SettingsScreen from './app/screens/settings/settingsScreen';
import LoginScreen from './app/screens/auth/loginScreen';
import RegisterScreen from './app/screens/auth/registerScreen';
import SelectQuizCategoryScreen from './app/screens/quiz/selectQuizCategoryScreen';
import SelectQuizViaCategoryIdScreen from './app/screens/quiz/selectQuizViaCategoryIdScreen';
import ScoreBoardScreen from './app/screens/quiz/scoreBoardScreen';
import HomeScreen from './app/screens/homeScreen';

const App = () => {
  let auth = useSelector(state => state.auth);
  let Stack = createNativeStackNavigator();
  let isLoggedIn = isEmpty(auth) ? false : true;

  console.log('8888888 888888 route', Stack.Navigator);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="loginScreen"
          options={isLoggedIn ? {title: 'Home'} : {title: 'Login'}}
          component={isLoggedIn ? HomeScreen : LoginScreen}
        />
        <Stack.Screen
          name="homeScreen"
          options={isLoggedIn ? {title: 'Home'} : {title: 'Login'}}
          component={isLoggedIn ? HomeScreen : LoginScreen}
        />
        <Stack.Screen
          name="forgotPasswordScreen"
          options={isLoggedIn ? {title: 'Home'} : {title: 'Forgot Password'}}
          component={isLoggedIn ? HomeScreen : ForgotPasswordScreen}
        />
        <Stack.Screen
          name="verifyForgotPasswordOtpScreen"
          options={isLoggedIn ? {title: 'Home'} : {title: 'Verify OTP'}}
          component={isLoggedIn ? HomeScreen : VerifyForgotPasswordOtpScreen}
        />
        <Stack.Screen
          name="updatePasswordScreen"
          options={{title: 'Update Password'}}
          component={UpdatePasswordScreen}
        />
        <Stack.Screen
          name="settingsScreen"
          options={isLoggedIn ? {title: 'Settings'} : {title: 'Login'}}
          component={isLoggedIn ? SettingsScreen : LoginScreen}
        />
        <Stack.Screen
          name="welcomeScreen"
          options={isLoggedIn ? {title: 'Welcome'} : {title: 'Login'}}
          component={isLoggedIn ? WelcomeScreen : LoginScreen}
        />
        <Stack.Screen
          name="profileScreen"
          options={isLoggedIn ? {title: 'My Profile'} : {title: 'Login'}}
          component={isLoggedIn ? ProfileScreen : LoginScreen}
        />
        <Stack.Screen
          name="registerScreen"
          options={isLoggedIn ? {title: 'Home'} : {title: 'Register'}}
          component={isLoggedIn ? HomeScreen : RegisterScreen}
        />
        <Stack.Screen
          name="selectQuizCategoryScreen"
          options={isLoggedIn ? {title: 'Quiz Category'} : {title: 'Login'}}
          component={isLoggedIn ? SelectQuizCategoryScreen : LoginScreen}
        />
        <Stack.Screen
          name="selectQuizViaCategoryIdScreen"
          options={isLoggedIn ? {title: 'The Quiz'} : {title: 'Login'}}
          component={isLoggedIn ? SelectQuizViaCategoryIdScreen : LoginScreen}
        />
        <Stack.Screen
          name="scoreBoardScreen"
          options={isLoggedIn ? {title: 'My Scoreboard'} : {title: 'Login'}}
          component={isLoggedIn ? ScoreBoardScreen : LoginScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
