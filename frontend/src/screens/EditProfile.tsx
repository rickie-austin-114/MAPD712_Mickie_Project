// src/screens/ViewProfileScreen.tsx
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, Platform, Image, Pressable } from 'react-native';
import "../../global.css";
import { SafeAreaView } from 'react-native-safe-area-context';
import { storeColors } from '../theme';

const EditProfileScreen = ({ route, navigation }) => {
  const { patient } = route.params;

  const backendURL = Platform.OS === "android" ? "http://10.0.2.2:5001/" : "http://localhost:5001/"


    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [error, setError] = useState('');
    const [profilePicture, setProfilePicture] = useState('');

    useEffect(() => {
        setName(patient.name);
        setAge(String(patient.age));
        setGender(patient.gender);
        setAddress(patient.address);
        setZipCode(patient.zipCode);
        setProfilePicture(patient.profilePicture);
    }, [])

    const updatePatient = async () => {
        try {
            const response = await axios.put(`${backendURL}api/patients/${patient._id}`, {
              name,
              age: Number(age),
              gender,
              address,
              zipCode,
              profilePicture,
            });
            Alert.alert('Success', 'Patient updated successfully');
            navigation.goBack();
          } catch (error) {
            setError(error.response?.data?.message || 'An error occurred');
          }
    }

  return (
    <View
    className="flex-1 bg-white"
    style={{ backgroundColor: storeColors.bg }}
  >
    <SafeAreaView className="flex">
      <View className="flex-row justify-center">
        <Image
          source={{uri: profilePicture}}
          style={{ width: 100, height: 100, resizeMode: "stretch" }}
        />
      </View>
    </SafeAreaView>
    <View
      className="flex-1 bg-white px-8 pt-8"
      style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
    >
      <Text
        className="text-gray-900 ml-4"
        style={{ fontSize: 40, fontWeight: "bold" }}
      >
        Edit Patient
      </Text>

      <Text className="text-gray-700 ml-4">Name</Text>
      <TextInput
        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
        placeholder="Name" value={name} onChangeText={setName}
      />


      <Text className="text-gray-700 ml-4">Age</Text>
      <TextInput
        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
        placeholder="Age" value={age} onChangeText={setAge}
                 />

      <Text className="text-gray-700 ml-4">Gender</Text>
      <TextInput
        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
        placeholder="Gender" value={gender} onChangeText={setGender} />

      <Text className="text-gray-700 ml-4">Address</Text>
      <TextInput
        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
        placeholder="Address" value={address} onChangeText={setAddress} />


      <Text className="text-gray-700 ml-4">Zip Code</Text>
      <TextInput
        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
        placeholder="Zip Code" value={zipCode} onChangeText={setZipCode} />

      <Text className="text-gray-700 ml-4">Profile Picture</Text>
      <TextInput
        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
        placeholder="Profile Image Link" value={profilePicture} onChangeText={setProfilePicture} />
        
        <Pressable
      onPress={
        updatePatient
      }
      style={styles.button}
    >
      <Text style={styles.text}>Update Patient</Text>
    </Pressable>
    {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffc5"
  },
  button: {
    backgroundColor: "#6200ee",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonPressed: {
    backgroundColor: "#3700b3",
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});

export default EditProfileScreen;