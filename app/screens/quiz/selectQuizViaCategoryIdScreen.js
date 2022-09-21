import React, {useEffect} from 'react';
import {StyleSheet, Text, FlatList, View, TouchableOpacity} from 'react-native';
import {getAllQuizViaCategoryId} from '../../actions/quizAction';
import {useSelector, useDispatch} from 'react-redux';

export const SelectQuizViaCategoryIdScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('route', route);
    dispatch(getAllQuizViaCategoryId(route.params.categoryId));
  }, []);
  const state = useSelector(state => console.log('state123123*********************', state));
  const quiz = useSelector(state => state.quiz.allQuiz);
  console.log('quiz 123123 123', quiz);
  return (
    <View style={styles.body}>
      {quiz && quiz.length > 0 ? (
        <FlatList
          contentContainerStyle={styles.item}
          data={quiz}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('');
              }}>
              <Text style={styles.item}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text>No Quizes Found in this Category!</Text>
      )}
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
    autoCapitalize: true,
    backgroundColor: '#00000012',
    padding: 12,
  },
  bottomText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
export default SelectQuizViaCategoryIdScreen;
