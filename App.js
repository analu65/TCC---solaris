
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Home from './screens/Home';
import Avisos from './screens/Avisos';
import { StatusBar } from 'expo-status-bar';
export default function App() {
const BottomTab = createBottomTabNavigator();
<StatusBar style="auto" />
    return(
      
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
