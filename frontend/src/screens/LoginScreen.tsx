// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Platform } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const baseURL = Platform.OS === 'android' ? 'http://10.0.2.2:5001/' : 'http://localhost:5001/'


  const handleLogin = async () => {
    try {
      const response = await axios.post(`${baseURL}api/login`, {
        email,
        password,
      });
      Alert.alert('Login Successful!');
      // Store token and navigate to Account
      const token = response.data.token;
      // You might want to store the token using AsyncStorage for later use
      navigation.navigate('Menu', { token });
    } catch (error) {
      Alert.alert('Login Failed', error.response.data.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffc5"

  },
});

export default LoginScreen;