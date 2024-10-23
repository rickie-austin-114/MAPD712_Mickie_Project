// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuScreen from './src/screens/MenuScreen';
import AddPatientScreen from './src/screens/AddPatientScreen';
import AddRecordScreen from './src/screens/AddRecordScreen';
import ListPatientsScreen from './src/screens/ListPatientsScreen';
import ViewProfileScreen from './src/screens/ViewProfileScreen';
import ViewRecordScreen from './src/screens/ViewRecordScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="AddPatient" component={AddPatientScreen} />
        <Stack.Screen name="AddRecord" component={AddRecordScreen} />
        <Stack.Screen name="ListPatients" component={ListPatientsScreen} />
        <Stack.Screen name="ViewProfile" component={ViewProfileScreen} />
        <Stack.Screen name="ViewRecord" component={ViewRecordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;