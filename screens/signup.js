import { View,StyleSheet, Text, Image, ScrollView, Switch, TextInput, ImageBackground, Button} from "react-native";
import { useState } from "react";
import { db, auth } from "../controller";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function signUp({navigation}){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');
    const [profAluno, setProfAluno] = useState(false);

    const cadastrar = async () => {
        if (!nome || !telefone || !email || !senha || !cpf) {
            alert("Por favor, preencha todos os campos!");
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            
            await addDoc(collection(db, "usuarios"), {
                uid: userCredential.user.uid,
                nome: nome,
                telefone: telefone,
                email: email,
                tipo: profAluno ? "professor" : "aluno", 
                cpf: cpf,
            });

            console.log('Usuário cadastrado com sucesso!', userCredential.user.email);
            alert("Cadastro realizado com sucesso!");
            navigation.navigate('Login');
        } catch (error) {
            console.log('Erro:', error.message);
            alert("Erro ao cadastrar: " + error.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollcontainer}>
        <View style={styles.container}>
            <Text style={styles.title}>
                É novo? Faça seu cadastro
            </Text>
            <Text style={styles.subtitle}>Preencha um formulário para realizar a inscrição</Text>
            <TextInput style={styles.input}
            placeholder="Digite seu E-mail"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"></TextInput>
            <TextInput style={styles.input}
            placeholder="Digite sua Senha"
            value={senha}
            onChangeText={setSenha}></TextInput>
            <TextInput 
                    style={styles.input}
                    placeholder="Nome completo"
                    value={nome}
                    onChangeText={setNome}
                    autoCapitalize="words"
                />
            <TextInput 
                    style={styles.input}
                    placeholder="Telefone"
                    value={telefone}
                    onChangeText={setTelefone}
                    keyboardType="phone-pad"
                />
             <TextInput 
                    style={styles.input}
                    placeholder="CPF"
                    value={cpf}
                    onChangeText={setCpf}
                    keyboardType="numeric"
                />
            <View style={styles.switchContainer}>
                    <Text style={styles.switchText}>Sou professor:</Text>
                    <Switch
                        value={profAluno}
                        onValueChange={setProfAluno}
                    />
                </View>
            
            
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollcontainer:{
        flexGrow: 1,
        justifyContent: 'center'
    },
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
            marginTop: 30,
            paddingHorizontal: 10,
            fontSize: 16,
            color: '#333',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 20,
        marginBottom: 20,
    },
    switchText: {
        fontSize: 16,
        color: '#3d2f49',
    },
})