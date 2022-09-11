import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
} from 'react-native';
import {getAllQuizCategories} from '../../actions/quizAction';

import {useSelector, useDispatch} from 'react-redux';

export const SelectQuizCategoryScreen = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllQuizCategories());
  }, []);

  // const state = useSelector(state => console.log('state123123*********************', state));
  const quizCategories = useSelector(state => state.quiz.allQuizCategories);
  // console.log('quizCategories 123123 123', quizCategories);
  return (
    <View style={styles.body}>
      <FlatList
        contentContainerStyle={styles.item}
        data={quizCategories}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('selectQuizViaCategoryIdScreen', {categoryId: item._id});
            }}>
            <Text style={styles.item}>{item.name}</Text>
          </TouchableOpacity>
        )}
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
    autoCapitalize: true,
    backgroundColor: '#00000012',
    padding: 12,
  },
  bottomText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
export default SelectQuizCategoryScreen;
