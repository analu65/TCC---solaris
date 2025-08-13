import { StyleSheet, View, Button, ImageBackground } from "react-native";
export default function Selection({navigation}){
    return(

        <View style={styles.container}>
        <ImageBackground source={require('../fotossolaris/begemelhor2.png')} style={styles.imgbackground}>
            <View style={styles.buttonsignup}>
            <Button
            title="Já tenho cadastro"
            onPress={() => navigation.navigate('Login')}
        />
        </View>
        <Button
            title="Quero me cadastrar"
            onPress={() => navigation.navigate('signUp')}
        />
        </ImageBackground>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,  
},
imgbackground: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
},
buttonsignup: {
    color: '#e6a09e'
}
})