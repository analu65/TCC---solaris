import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import Avisos from '../screens/Avisos';

export default function App(){
    const Drawer = createDrawerNavigator();
    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name='Home' component={Home}></Drawer.Screen>
                <Drawer.Screen name='Avisos' component={Avisos}></Drawer.Screen>
            </Drawer.Navigator>
        </NavigationContainer>
    );
}