import React from 'react';
import {StyleSheet, Text, Button, View} from 'react-native';

export const WelcomeScreen = ({navigation}) => {
  return (
    <View style={styles.body}>
      <Text style={styles.welcomeText}>QuizKaro</Text>
      <Text style={styles.underText}>Start testing yourself</Text>
      <Button
        onPress={() => {
          navigation.navigate('loginScreen');
        }}
        style={styles.button}
        title="Get Started"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    color: 'green',
    fontSize: 44,
  },
  underText: {
    color: 'green',
    fontSize: 18,
  },
  button: {
    color: 'red',
    fontSize: 24,
  },
});

export default WelcomeScreen;
