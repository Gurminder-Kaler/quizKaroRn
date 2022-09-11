import React from 'react'
import { Text, StyleSheet } from 'react-native';

export const RequiredSign = () => {
    return (
        <Text style={styles.required}>
            *
        </Text>
    )
}

const styles = StyleSheet.create({
    required: {
      color: 'red'
    }, 
  });

export default RequiredSign;