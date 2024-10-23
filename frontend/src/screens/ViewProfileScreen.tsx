// src/screens/ViewProfileScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ViewProfileScreen = ({ route }) => {
  const { patient } = route.params;

  return (
    <View style={styles.container}>
      <Text>Name: {patient.name}</Text>
      <Text>Age: {patient.age}</Text>
      <Text>Gender: {patient.gender}</Text>
      <Text>Address: {patient.address}</Text>
      <Text>Zip Code: {patient.zipCode}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default ViewProfileScreen;