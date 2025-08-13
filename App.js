
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Home from './screens/Home';
import Avisos from './screens/Avisos';
import Selection from './screens/selection';
import { StatusBar } from 'expo-status-bar';
import signUp from './screens/signup';
import Login from './screens/login';
function bottomTabs(){
  const BottomTab = createBottomTabNavigator();
  return (
    <NavigationContainer>
            <BottomTab.Navigator screenOptions={{
            animation: 'shift',
            tabBarActiveTintColor: '#dd6a71', //cor do texto que está ativo
            tabBarInactiveTintColor:'#dd6a71',
            tabBarInactiveBackgroundColor: '#ffffff',
            tabBarActiveBackgroundColor: '#d3d3d3', //cor de fundo da aba ativa
            tabBarLabelStyle: {
              marginBottom: -2
            }
          }}>
                <BottomTab.Screen name='Home' component={Home} options={{tabBarIcon: () => (<MaterialCommunityIcons name="home" size={20} color="#dd6a71" />), header: () => null}}></BottomTab.Screen>
                <BottomTab.Screen name='Avisos' component={Avisos} options={{tabBarIcon: () => (<MaterialCommunityIcons name="bell" size={20} color="#dd6a71" />), header: () => null}}></BottomTab.Screen>
            </BottomTab.Navigator>
        </NavigationContainer>
  );
}


export default function App() {
  const Stack = createStackNavigator();
  <StatusBar style="auto" />
    return(
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='Selection' component={Selection}></Stack.Screen>
            <Stack.Screen name='Login' component={Login}></Stack.Screen>
            <Stack.Screen name='signUp' component={signUp}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
