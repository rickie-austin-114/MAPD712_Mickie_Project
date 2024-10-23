// screens/MenuScreen.js
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const MainMenuScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button title="Register" onPress={() => navigation.navigate('Register')} />
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainMenuScreen;