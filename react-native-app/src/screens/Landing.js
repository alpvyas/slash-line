import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Landing = () => {
  const message = 'Slash Line Baseball';

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Landing;