// src/screens/AddRecordScreen.tsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  Platform,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

const AddRecordScreen = ({ route, navigation }) => {
  const { patient } = route.params;

  const [readingValue, setReadingValue] = useState("");
  const [error, setError] = useState("");

  const [selectedOption, setSelectedOption] = useState(null);

  // Sample options for the radio buttons
  const options = [
    { label: "Blood Pressure", value: "blood pressure" },
    { label: "Respiratory Rate", value: "respiratory rate" },
    { label: "Blood Oxygen Level", value: "blood oxygen level" },
    { label: "Heartbeat Rate", value: "heart beat rate" },
  ];

  const backendURL =
    Platform.OS === "android"
      ? "http://10.0.2.2:5001/"
      : "http://localhost:5001/";

  const addRecord = async () => {
    try {
      const response = await axios.post(`${backendURL}api/record`, {
        patient: patient._id,
        datatype: selectedOption,
        readingValue: Number(readingValue),
      });
      Alert.alert("Success", "Record updated successfully");
      navigation.goBack();
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.radioContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={styles.radioButton}
            onPress={() => setSelectedOption(option.value)}
          >
            <View
              style={[
                styles.radioCircle,
                selectedOption === option.value && styles.selectedRadioCircle,
              ]}
            />
            <Text style={styles.radioLabel}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        placeholder="Value"
        value={readingValue}
        onChangeText={setReadingValue}
      />
      <Button title="Add Record" onPress={addRecord} />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
  radioContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 20,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  selectedRadioCircle: {
    backgroundColor: "#000",
  },
  radioLabel: {
    fontSize: 16,
  },
});

export default AddRecordScreen;
