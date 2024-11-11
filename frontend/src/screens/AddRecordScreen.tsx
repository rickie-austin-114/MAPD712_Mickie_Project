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

  const [datatype, setDatatype] = useState("");
  const [error, setError] = useState("");

  const [selectedOption, setSelectedOption] = useState(null);

  // Sample options for the radio buttons
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];


  const backendURL =
    Platform.OS === "android"
      ? "http://10.0.2.2:5001/"
      : "http://localhost:5001/";

  const addRecord = async () => {
    try {
      const response = await axios.post(
        `${backendURL}api/record`,
        {
          patient: patient._id,
          datatype,
          readingValue: Number(value),
        }
      );
      Alert.alert("Success", "Record updated successfully");
      navigation.goBack();
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Datatype"
        value={datatype}
        onChangeText={setDatatype}
      />

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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRadioCircle: {
    backgroundColor: '#000',
  },
  radioLabel: {
    fontSize: 16,
  },
});

export default AddRecordScreen;
