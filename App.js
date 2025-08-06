import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import Avisos from './screens/Avisos';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const BottomTab = createBottomTabNavigator();
  return(
      <NavigationContainer>
          <BottomTab.Navigator>
              <BottomTab.Screen name='Home' component={Home}></BottomTab.Screen>
              <BottomTab.Screen name='Avisos' component={Avisos}></BottomTab.Screen>
          </BottomTab.Navigator>
      </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
