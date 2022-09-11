import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import {useSelector} from 'react-redux';

export const HomeScreen = ({navigation}) => {
  const state = useSelector(state =>
    console.log('State HOME screen ////////////////////', state),
  );
  return (
    <ScrollView contentContainerStyle={styles.body}>
      <Text style={styles.score}>Score : {'14'}</Text>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('scoreBoardScreen')}
          style={styles.box}>
          <Text style={styles.label}>Scoreboard</Text>
          <MaterialCommunityIcons name="scoreboard" size={80} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('selectQuizCategoryScreen')}
          style={styles.box}>
          <Text style={styles.label}>Start Quiz</Text>
          <MaterialCommunityIcons name="run-fast" size={80} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('profileScreen')}
          style={styles.box}>
          <Text style={styles.label}>My Profile</Text>
          <AntDesign name="user" size={80} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('settingsScreen')}
          style={styles.box}>
          <Text style={styles.label}>Settings</Text>
          <FontAwesome name="cog" size={80} color={'black'} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, flexDirection: 'row', flexWrap: 'wrap'},
  box: {
    width: '39%',
    margin: 12,
    padding: 13,
    backgroundColor: '#00000012',
    fontSize: 24,
    height: 150,
    width: 150,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  label: {
    fontSize: 19,
    marginTop: 15,
  },
  score: {
    textAlign: 'center',
    fontSize: 34,
  },
  body: {
    flex: 1,
    backgroundColor: '#2a2a2a02',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 16,
  },
  bottomText: {
    fontSize: 24,
    textAlign: 'center',
  },
});
export default HomeScreen;
