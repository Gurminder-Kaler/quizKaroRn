import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  Button,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {getScoreViaUserId} from '../../actions/scoreAction';

import {useSelector} from 'react-redux';

export const ScoreBoardScreen = ({navigation}) => {
  const user = useSelector(state => console.log('state', state));
  useEffect(() => {
    // getScoreViaUserIdAction(user.userId);
  }, []);
  return (
    <View style={styles.body}>
      <FlatList
        contentContainerStyle={styles.item}
        data={[
          {key: 'Quiz 1 : '},
          {key: 'Dan'},
          {key: 'Dominic'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'John'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie'},
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#2a2a2a02',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 25,
  },
  item: {
    margin: 5,
    backgroundColor: '#00000012',
    padding: 12,
  },
  bottomText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
export default ScoreBoardScreen;
