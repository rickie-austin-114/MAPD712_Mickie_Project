// src/screens/ViewRecordScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ViewRecordScreen = ({ route }) => {
  const { patient } = route.params;

  return (
    <View style={styles.container}>
      <Text>Name: {patient.name}</Text>
      <Text>Blood Pressure: {patient.bloodPressure} mmHg</Text>
      <Text>Respiratory Rate: {patient.respiratoryRate} / min</Text>
      <Text>Blood Oxygen Level: {patient.bloodOxygenLevel} %</Text>
      <Text>Heartbeat Rate: {patient.heartbeatRate} / min</Text>
      <Text>Condition: {patient.condition}</Text>
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

export default ViewRecordScreen;