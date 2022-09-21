import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, TextInput, Switch} from 'react-native';

export const PracticeScreen = ({navigation}) => {
  const [text, setText] = useState('');
  const [whiteBackground, setWhiteBackground] = useState(true);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View
      style={
        whiteBackground == true ? styles.whiteContainer : styles.blackContainer
      }>
      <Text style={styles.text}>Text : {text}</Text>
      <TextInput
        style={styles.input}
        clearTextOnFocus={true}
        onChangeText={value => {
          setText(value);
        }}
      />
      <Button title="Click me to clear" onPress={() => setText('')} />
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#f00"
        onValueChange={toggleSwitch}
        value={isEnabled}
        onValueChange={() => setWhiteBackground(!whiteBackground)}></Switch>
    </View>
  );
};

const styles = StyleSheet.create({
  whiteContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#ffffff',
  },
  blackContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#000000',
  },

  label: {
    fontSize: 19,
    marginTop: 15,
  },
  text: {
    textAlign: 'center',
    fontSize: 34,
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
  bottomText: {
    fontSize: 24,
    textAlign: 'center',
  },
});
export default PracticeScreen;
