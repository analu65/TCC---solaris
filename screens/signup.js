import { View,StyleSheet, Text, Image, TextInput, ImageBackground, Button} from "react-native";
import { useState } from "react";
export default function signUp({navigation}){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const signupUser = () => {
        createUserWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            console.log('Usuário cadastrado.', userCredential.user.email);
            navigation.navigate('Login');
        })
        .catch((error) => {
            console.log('Erro.', error.message);
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                É novo? Faça seu cadastro
            </Text>
            <Text style={styles.subtitle}>Preencha um formulário para realizar a inscrição</Text>
            <TextInput style={styles.input}
            placeholder="Digite seu E-mail"
            value={email}
            onChangeText={setEmail}></TextInput>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee0d3',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: '#3d2f49',
        textAlign: 'center',
        textShadowColor: 'rgba(61, 47, 73, 0.3)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
    },
    subtitle: {
        fontSize: 13,
        fontWeight: '800',
        color: '#3d2f49',
        textAlign: 'center',
        textShadowColor: 'rgba(61, 47, 73, 0.3)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
        maxWidth: '85%',
        marginTop: 6
    },
    input: {
            width: '80%',
            height: 50,
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 12,
            backgroundColor: '#fff',
            marginTop: 20,
            paddingHorizontal: 10,
            fontSize: 16,
            color: '#333',
    }
})