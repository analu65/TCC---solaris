import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import Avisos from '../screens/Avisos';

export default function App(){
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