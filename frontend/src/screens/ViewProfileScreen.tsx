// src/screens/ViewProfileScreen.tsx
import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Platform,
  Pressable,
  Alert,
  ScrollView,
  TouchableOpacity, 
} from "react-native";
import { logToLogBoxAndConsole } from "react-native-reanimated/lib/typescript/logger";
import "../../global.css";
import { SafeAreaView } from "react-native-safe-area-context";

import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowDownTrayIcon,
  Bars3CenterLeftIcon,
  BellIcon,
  GlobeAmericasIcon,
  InformationCircleIcon,
  UserCircleIcon,
} from "react-native-heroicons/solid";
import { withDecay } from "react-native-reanimated";
import { storeColors } from "../theme";


const ViewProfileScreen = ({ route, navigation }) => {
  const { patient } = route.params;
  const [records, setRecords] = useState([]);

  const backendURL =
    Platform.OS === "android"
      ? "http://10.0.2.2:5001/"
      : "http://localhost:5001/";

  const fetchRecords = async () => {
    try {
      const response = await axios.get(
        `${backendURL}api/patient/record/${patient._id}`
      );
      setRecords(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const deleteRecord = async (id) => {
    const response = await axios.delete(
      `${backendURL}api/record/${id}`
    );
    fetchRecords();
  }

  return (
    // <View style={styles.container}>
    //   <Image style={styles.logo} source={{ uri: patient.profilePicture }} />
    //   <Text>id: {patient._id}</Text>
    //   <Text>Name: {patient.name}</Text>
    //   <Text>Age: {patient.age}</Text>
    //   <Text>Gender: {patient.gender}</Text>
    //   <Text>Address: {patient.address}</Text>
    //   <Text>Zip Code: {patient.zipCode}</Text>
    //   <Text>Condition: {patient.condition}</Text>
    //   <Text>Records:</Text>
    //   <FlatList
    //     data={records}
    //     keyExtractor={(item) => item._id}
    //     renderItem={({ item }) => (
    //       <View style={styles.recordContainer}>
    //         <Text style={styles.recordText}>{item.datatype}</Text>
    //         <Text style={styles.recordText}>{item.readingValue}</Text>
    //         <Text style={styles.recordText}>{item.measurementDate}</Text>
    //       </View>
    //     )}
    //   />
    // </View>


<LinearGradient
      colors={["rgba(58, 131, 244, 0.4)", "rgba(9, 181, 211, 0.4)"]}
      className="w-full flex-1"
    >

        <View className="container">
          <View className="flex-row justify-between items-center px-4">
            <Bars3CenterLeftIcon color={storeColors.text} size="30" />
            <BellIcon color={storeColors.text} size="30" />
          </View>
        </View>
        <View className="mt-3">
          <Text
            style={{ color: storeColors.text }}
            className="ml-4 text-3xl font-bold"
          >
            View Patient
          </Text>
        </View>
        <View className="flex-row justify-center">
        <Image
          source={{uri: patient.profilePicture}}
          style={{ width: 100, height: 100, resizeMode: "stretch", backgroundColor: "rgba(255,255,255,0.4)" }}
        />
      </View>
        <Text> </Text>
        <View className="mt-3">
          <Text
            style={{ color: storeColors.text }}
            className="ml-4 text-2xl"
          >
            Name: {patient.name}
          </Text>
        </View>
        <View className="mt-3">
          <Text
            style={{ color: storeColors.text }}
            className="ml-4 text-2xl"
          >
            Age: {patient.age}
          </Text>
        </View>
        <View className="mt-3">
          <Text
            style={{ color: storeColors.text }}
            className="ml-4 text-2xl"
          >
            Gender: {patient.gender}
          </Text>
        </View>
        <View className="mt-3">
          <Text
            style={{ color: storeColors.text }}
            className="ml-4 text-2xl"
          >
            Address: {patient.address}
          </Text>
        </View>

        <View className="mt-3">
          <Text
            style={{ color: storeColors.text }}
            className="ml-4 text-2xl"
          >
            Zip Code: {patient.zipCode}
          </Text>
        </View>

        <View className="mt-3">
          <Text
            style={{ color: storeColors.text }}
            className="ml-4 text-2xl"
          >
            Condition: {patient.condition}
          </Text>
        </View>

        <View className="mt-3">
          <Text
            style={{ color: storeColors.text }}
            className="ml-4 text-3xl font-bold"
          >
            List of Records
          </Text>
        </View>

        <ScrollView
          style={{ height: 700 }}
          showsVerticalScrollIndicator={false}
        >
          {records.map((record, index) => {
            let bg = "rgba(255,255,255,0.4)";
            return (
              <TouchableOpacity
                style={{ backgroundColor: bg }}
                className="mx-4 p-2 mb-2 flex-row rounded-3xl"
                key={index}
              >
                <View className="flex-1 flex justify-center pl-3 space-y-3">

                    <View className="flex-row space-x-1">
                      <InformationCircleIcon
                        size="15"
                        className="text-blue-500"
                      />
                      <Text>
                        Type: {record.datatype}
                      </Text>
                    </View>
                    <View className="flex-row space-x-1">
                      <Text className="text-gray-700">
                        Value: {record.readingValue}
                      </Text>
                    </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
</LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffc5",
  },
  logo: {
    width: 100,
    height: 100,
  },
  recordText: {
    fontSize: 24,
  },
  recordContainer: {
    marginVertical: 10,
    backgroundColor: "#eeeeee",
  },
});

export default ViewProfileScreen;
