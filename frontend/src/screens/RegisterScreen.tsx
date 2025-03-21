// screens/RegisterScreen.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Platform,
  Image,
  Text,
  Pressable,
} from "react-native";
import axios from "axios";
import "../../global.css";
import { storeColors } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";


const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const baseURL =
    Platform.OS === "android"
      ? "http://10.0.2.2:5001/"
      : "http://localhost:5001/";

  const handleRegister = async () => {
    try {
      await axios.post(`${baseURL}api/register`, {
        name,
        introduction,
        email,
        password,
      });
      Alert.alert("Registration Successful!");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Registration Failed", error.response.data.message);
    }
  };

  return (
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
          placeholder="Name" value={name} onChangeText={setName}
        />


        <Text className="text-gray-700 ml-4">Self Introduction</Text>
        <TextInput
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
          placeholder="Introduction" value={introduction} onChangeText={setIntroduction}         />

        <Text className="text-gray-700 ml-4">Email Address</Text>
        <TextInput
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
          placeholder="Email" value={email} onChangeText={setEmail}
                  />


        <Text className="text-gray-700 ml-4">Password</Text>
        <TextInput
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
          placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry        />

<Pressable
        onPress={
          handleRegister
        }
        style={styles.button}
      >
        <Text style={styles.text}>Register</Text>
      </Pressable>
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

export default RegisterScreen;
