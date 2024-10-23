// screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Platform } from 'react-native';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const baseURL = Platform.OS === 'android' ?  'http://10.0.2.2:5001/' : 'http://localhost:5001/';

  const handleRegister = async () => {
    try {
      await axios.post(`${baseURL}api/register`, {
        name,
        introduction,
        email,
        password,
      });
      Alert.alert('Registration Successful!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Registration Failed', error.response.data.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Introduction" value={introduction} onChangeText={setIntroduction} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Submit" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default RegisterScreen;