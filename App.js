import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/home';
import Avisos from './screens/avisos';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function App() {
  const BottomTab = createBottomTabNavigator();
  return(
      <NavigationContainer>
          <BottomTab.Navigator screenOptions={{
            animation: 'shift',
            tabBarActiveBackgroundColor: '#d3d3d3',
            headerShown: false
          }}>
              <BottomTab.Screen name='Home' component={Home} options={{tabBarIcon: () => (<MaterialCommunityIcons name="home" size={20} color="black" />)}}></BottomTab.Screen>
              <BottomTab.Screen name='Avisos' component={Avisos} options={{tabBarIcon: () => (<MaterialCommunityIcons name="bell" size={20} color="black" />)}}></BottomTab.Screen>
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
