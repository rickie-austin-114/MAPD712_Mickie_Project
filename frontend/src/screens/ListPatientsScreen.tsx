// src/screens/ListPatientsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, Platform } from 'react-native';
import axios from 'axios';

const ListPatientsScreen = ({ navigation }) => {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState('');

  const backendURL = Platform.OS === "android" ? "http://10.0.2.2:5001/" : "http://localhost:5001/";


  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`${backendURL}api/patients`);
        setPatients(response.data);
      } catch (error) {
        setError(error.response?.data?.message || 'An error occurred');
      }
    };
    fetchPatients();
  }, []);

  const viewProfile = (patient) => {
    navigation.navigate('ViewProfile', { patient });
  };

  const viewRecord = (patient) => {
    navigation.navigate('ViewRecord', { patient });
  };

  return (
    <View style={styles.container}>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <FlatList
        data={patients}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.patientContainer}>
            <Text>{item.name}</Text>
            <Button title="View Profile" onPress={() => viewProfile(item)} />
            <Button title="View Record" onPress={() => viewRecord(item)} />
          </View>
        )}
      />
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
  patientContainer: {
    marginVertical: 10,
  },
});

export default ListPatientsScreen;