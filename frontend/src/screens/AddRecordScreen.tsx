// src/screens/AddRecordScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, Platform } from 'react-native';
import axios from 'axios';

const AddRecordScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [respiratoryRate, setRespiratoryRate] = useState('');
  const [bloodOxygenLevel, setBloodOxygenLevel] = useState('');
  const [heartbeatRate, setHeartbeatRate] = useState('');
  const [condition, setCondition] = useState('Normal');
  const [error, setError] = useState('');

  const backendURL = Platform.OS === "android" ? "http://10.0.2.2:5000/" : "http://localhost:5000/"

  const addRecord = async () => {
    try {
      const response = await axios.put(`${backendURL}api/patients/${name}`, {
        bloodPressure,
        respiratoryRate,
        bloodOxygenLevel,
        heartbeatRate,
        condition,
      });
      Alert.alert('Success', 'Record updated successfully');
      navigation.goBack();
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Patient Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Blood Pressure" value={bloodPressure} onChangeText={setBloodPressure} />
      <TextInput placeholder="Respiratory Rate" value={respiratoryRate} onChangeText={setRespiratoryRate} />
      <TextInput placeholder="Blood Oxygen Level" value={bloodOxygenLevel} onChangeText={setBloodOxygenLevel} />
      <TextInput placeholder="Heartbeat Rate" value={heartbeatRate} onChangeText={setHeartbeatRate} />
      <TextInput placeholder="Condition" value={condition} onChangeText={setCondition} />
      <Button title="Update Record" onPress={addRecord} />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  errorText: {
    color: 'red',
  },
});

export default AddRecordScreen;