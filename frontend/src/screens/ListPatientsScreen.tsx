// src/screens/ListPatientsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, Platform, Pressable } from 'react-native';
import axios from 'axios';

const ListPatientsScreen = ({ navigation }) => {
    const [patients, setPatients] = useState([]);
    const [error, setError] = useState('');

    const backendURL = Platform.OS === "android" ? "http://10.0.2.2:5001/" : "http://localhost:5001/";


    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get(`${backendURL}api/patients`);
                setPatients(response.data);
            } catch (error) {
                setError(error.response?.data?.message || 'An error occurred');
            }
        };
        fetchPatients();
    }, []);

    const viewProfile = (patient) => {
        navigation.navigate('ViewProfile', { patient });
    };

    const viewRecord = (patient) => {
        navigation.navigate('ViewRecord', { patient });
    };

    return (
        <View style={styles.container}>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <FlatList
                data={patients}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <View style={styles.patientContainer}>
                        <Text style={styles.patientText}>{item.name}</Text>
                        <View style={styles.buttonContainer}>
                            <Pressable style={styles.button} onPress={() => viewProfile(item)}>
                                <Text style={styles.buttonText}>View Profile</Text>
                            </Pressable>
                            <Pressable style={styles.button} onPress={() => viewRecord(item)}>
                                <Text style={styles.buttonText}>View Record</Text>
                            </Pressable>
                        </View>
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
        backgroundColor: "#ffffc5"
      },
    errorText: {
        color: 'red',
    },
    patientText: {
        fontSize: 24
    },
    patientContainer: {
        marginVertical: 10,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        width: 150,
        height: 50,
        backgroundColor: '#ADDFFF',
    },
    buttonText: {
        color: "white"
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row', // Aligns children horizontally
        justifyContent: 'space-around', // Adjusts spacing between buttons
        alignItems: 'center', // Centers buttons vertically
    },
});

export default ListPatientsScreen;