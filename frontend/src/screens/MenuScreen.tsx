// src/screens/MenuScreen.tsx
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const MenuScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button title="Add Patient" onPress={() => navigation.navigate('AddPatient')} />
      <Button title="Add Record" onPress={() => navigation.navigate('AddRecord')} />
      <Button title="List Patients" onPress={() => navigation.navigate('ListPatients')} />
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

export default MenuScreen;