// src/screens/MenuScreen.tsx
import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';

const MenuScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button title="Add Patient" onPress={() => navigation.navigate('AddPatient')} />
      <Text />
      <Button title="Add Record" onPress={() => navigation.navigate('AddRecord')} />
      <Text />
      <Button title="List Patients" onPress={() => navigation.navigate('ListPatients')} />
      <Text />
      <Button title="List Critical Patients" onPress={() => navigation.navigate('ListCritical')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ffffc5"

  },
});

export default MenuScreen;