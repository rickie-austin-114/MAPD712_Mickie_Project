// src/screens/ListPatientsScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Alert,
  Platform,
  Pressable,
  Switch,
} from "react-native";
import axios from "axios";
import { useIsFocused } from '@react-navigation/native';

const ListPatientsScreen = ({ navigation }) => {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState("");
  const [listCritical, setListCritical] = useState(false);
  const isFocused = useIsFocused();


  const backendURL =
    Platform.OS === "android"
      ? "http://10.0.2.2:5001/"
      : "http://localhost:5001/";

  const fetchPatients = async () => {
    try {
      if (listCritical === false) {
        const response = await axios.get(`${backendURL}api/patients`);
        setPatients(response.data);
      } else {
        const response = await axios.get(`${backendURL}api/critical`);
        setPatients(response.data);
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  const toggleSwitch = () => {
    setListCritical(!listCritical);
  };


  useEffect(() => {
    fetchPatients();
  }, [listCritical, isFocused]);

  const viewProfile = (patient) => {
    navigation.navigate("ViewProfile", { patient });
  };

  const editProfile = (patient) => {
    navigation.navigate("EditProfile", { patient });
  };

  const addRecord = (patient) => {
    navigation.navigate("AddRecord", { patient });
  };

  const addPatient = () => {
    navigation.navigate("AddPatient");
  };

  return (
    <View style={styles.container}>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.menuContainer}>
        <Pressable style={styles.button} onPress={() => addPatient()}>
          <Text style={styles.buttonText}>Add Patient</Text>
        </Pressable>
        <Text>Show Critical Only:</Text>
        <Switch
           trackColor={{ false: "#767577", true: "#81b0ff" }}
           thumbColor={listCritical ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={listCritical}
        />
      </View>

      <Text></Text>

      <FlatList
        data={patients}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View>
            <View
              style={{
                backgroundColor:
                  item.condition === "Critical" ? "#ff474c" : "#ffffff",
              }}
            >
              <Text style={styles.patientText}>{item.name}</Text>
              <View style={styles.buttonContainer}>
                <Pressable
                  style={styles.button}
                  onPress={() => viewProfile(item)}
                >
                  <Text style={styles.buttonText}>View Profile</Text>
                </Pressable>
                <Pressable
                  style={styles.button}
                  onPress={() => editProfile(item)}
                >
                  <Text style={styles.buttonText}>Edit Profile</Text>
                </Pressable>
                <Pressable
                  style={styles.button}
                  onPress={() => addRecord(item)}
                >
                  <Text style={styles.buttonText}>Add Record</Text>
                </Pressable>
              </View>
              <Text> </Text>
            </View>
            <Text> </Text>
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
    backgroundColor: "#ffffc5",
  },
  errorText: {
    color: "red",
  },
  patientText: {
    fontSize: 24,
  },
  normalPatientContainer: {
    marginVertical: 10,
  },
  criticalPatientContainer: {
    marginVertical: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 1,
    elevation: 3,
    width: 100,
    height: 40,
    backgroundColor: "#ADDFFF",
  },
  buttonText: {
    color: "white",
    fontSize: 12,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row", // Aligns children horizontally
    justifyContent: "space-around", // Adjusts spacing between buttons
    alignItems: "center", // Centers buttons vertically
  },
  menuContainer: {
    flexDirection: "row", // Aligns children horizontally
    justifyContent: "space-around", // Adjusts spacing between buttons
    alignItems: "center", // Centers buttons vertically
  },
});

export default ListPatientsScreen;
