// src/screens/AddPatientScreen.tsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  Platform,
  Image,
  Pressable,
} from "react-native";
import axios from "axios";
import "../../global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { storeColors } from "../theme";

const AddPatientScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [error, setError] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const backendURL =
    Platform.OS === "android"
      ? "http://10.0.2.2:5001/"
      : "http://localhost:5001/";

  const addPatient = async () => {
    try {
      const response = await axios.post(`${backendURL}api/patients`, {
        name,
        age: Number(age),
        gender,
        address,
        zipCode,
        profilePicture,
      });
      Alert.alert("Success", "Patient added successfully");
      navigation.goBack();
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    // <View style={styles.container}>
    //   <TextInput placeholder="Name" value={name} onChangeText={setName} />
    //   <TextInput placeholder="Age" value={age} keyboardType="numeric" onChangeText={setAge} />
    //   <TextInput placeholder="Gender" value={gender} onChangeText={setGender} />
    //   <TextInput placeholder="Address" value={address} onChangeText={setAddress} />
    //   <TextInput placeholder="Zip Code" value={zipCode} onChangeText={setZipCode} />
    //   <TextInput placeholder="Profile Image Link" value={profilePicture} onChangeText={setProfilePicture} />

    //   <Button title="Add Patient" onPress={addPatient} />
    //   {error ? <Text style={styles.errorText}>{error}</Text> : null}
    // </View>
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: storeColors.bg }}
    >
      <SafeAreaView className="flex">
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/sencare.png")}
            style={{ width: 350, height: 100, resizeMode: "stretch" }}
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
          Register
        </Text>

        <Text className="text-gray-700 ml-4">Name</Text>
        <TextInput
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />

        <Text className="text-gray-700 ml-4">Age</Text>
        <TextInput
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
          placeholder="Age"
          value={age}
          keyboardType="numeric"
          onChangeText={setAge}
        />

        <Text className="text-gray-700 ml-4">Gender</Text>
        <TextInput
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
          placeholder="Gender"
          value={gender}
          onChangeText={setGender}
        />

        <Text className="text-gray-700 ml-4">Address</Text>
        <TextInput
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />

        <Text className="text-gray-700 ml-4">Zip Code</Text>
        <TextInput
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
          placeholder="Zip Code"
          value={zipCode}
          onChangeText={setZipCode}
        />

        <Text className="text-gray-700 ml-4">Profile Image</Text>
        <TextInput
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
          placeholder="Profile Image Link"
          value={profilePicture}
          onChangeText={setProfilePicture}
        />
        <Pressable onPress={addPatient} style={styles.button}>
          <Text style={styles.text}>Add Patient</Text>
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
    backgroundColor: "#ffffc5",
  },
  errorText: {
    color: "red",
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

export default AddPatientScreen;
