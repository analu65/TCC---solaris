import { View,StyleSheet, TouchableOpacity, Text, Image, ScrollView, Switch, TextInput, ImageBackground, Button} from "react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { db, auth } from "../controller";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function signUp({navigation}){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [tipo, setTipo] = useState('aluno');
    const [cpf, setCpf] = useState('');
    const [birthdate, setBirthdate] = useState('');
    //aqui comeca os dados de endereco
    const[cidade, setCidade] = useState('');
    const[cep, setCep] = useState('');
    const[bairro, setBairro] = useState('');
    const[rua,setRua] = useState('');
    const[numero,setNumero] = useState('');
    //aqui comeca a ficha de anamnese
    const[tiposanguineo, setTiposanguineo] = useState('');//string
    const[probsaude, setProbsaude] = useState('');//string
    const[alergiasinput, setAlergiasinput] = useState('');
    const[medicamentosinput, setMedicamentosinput] = useState('');
    const[probposturais, setProbposturais] = useState(false);
    const[riscocardiaco, setRiscocardiaco] = useState(false);
    const[doresfrequentes, setDoresfrequentes] = useState('');
    const[contatoemergencia, setContatoemergencia] = useState('');
    const[falarcom, setFalarcom] = useState('');
    const[praticaativ, setPraticaativ] = useState(false);
    const[frequenciaativ, setFrequenciaativ] = useState('');
    const[tipoativ,setTipoativ] = useState('');
    const[tempo, setTempo] = useState('');



    const cadastrar = async () => {
        if (!nome || !telefone || !email || !senha || !cpf) {
            alert("Por favor, preencha todos os campos!");
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            
            const alergiasArray = alergiasinput 
                .split(',')
                .map(item => item.trim())
                .filter(item => item !== '');

            const  medicamentosArray = medicamentosinput 
                .split(',')
                .map(item => item.trim())
                .filter(item => item !== '');
            

            await addDoc(collection(db, "usuarios"), {
                uid: userCredential.user.uid,
                nome: nome,
                telefone: telefone,
                email: email, 
                cpf: cpf,
                tipo: tipo,
                birthdate: birthdate,
                cidade: cidade,
                cep: cep,
                bairro: bairro,
                rua: rua,
                numero: numero,
                tiposanguineo: tiposanguineo,
                probsaude: probsaude,
                alergias: alergiasArray,
                medicamentos: medicamentosArray,
                probposturais: probposturais,
                contato: contatoemergencia,
                falarcom: falarcom,
                pratica: praticaativ,
                tipoAtiv: tipoativ,
                frequencia: frequenciaativ,
                tempo: tempo

            });

            console.log('Usuário cadastrado com sucesso!', userCredential.user.email);
            alert("Cadastro realizado com sucesso!");
            navigation.navigate('Login');
        } catch (error) {
            console.log('Erro:', error.message);
            alert("Erro ao cadastrar: " + error.message);
        }
    };
    const formatarData = (text) => {
        let cleaned = text.replace(/\D/g, '');
        
        if (cleaned.length <= 2) {
            return cleaned;
        } else if (cleaned.length <= 4) {
            return cleaned.substring(0, 2) + '/' + cleaned.substring(2);
        } else {
            return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4) + '/' + cleaned.substring(4, 8);
        }
    };
    

    return (
        <ScrollView contentContainerStyle={styles.scrollcontainer} showsVerticalScrollIndicator={true}>
        <View style={styles.container}>
            <Text style={styles.title}>
                É novo? Faça seu cadastro
            </Text>
            <Text style={styles.subtitle}>Preencha um formulário para realizar a inscrição</Text>
            <Text style={styles.descriptionItems}>É aluno ou professor?</Text>
            <Picker selectedValue={tipo}
             onValueChange={setTipo}
             style={styles.picker}>

             <Picker.Item label="Aluno" value="aluno"></Picker.Item>
             <Picker.Item label="Professor" value="professor"></Picker.Item>
            </Picker>
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
            <TextInput
                    style={styles.input}
                    value={birthdate}
                    placeholder="Data de Nascimento"
                    onChangeText={(text) => setBirthdate(formatarData(text))}
                    keyboardType="numeric"
                    maxLength={10}>
                </TextInput>
            <Text style={styles.descriptionItems}>ENDEREÇO</Text>
            <TextInput 
                    style={styles.input}
                    placeholder="CEP"
                    value={cep}
                    onChangeText={setCep}
                    keyboardType="numeric"
                />
            <TextInput 
                    style={styles.input}
                    placeholder="Cidade"
                    value={cidade}
                    onChangeText={setCidade}
                />
            <TextInput 
                    style={styles.input}
                    placeholder="Bairro"
                    value={bairro}
                    onChangeText={setBairro}
                />
            <TextInput 
                    style={styles.input}
                    placeholder="Rua"
                    value={rua}
                    onChangeText={setRua}
                />
            <TextInput 
                    style={styles.input}
                    placeholder="Número"
                    value={numero}
                    onChangeText={setNumero}
                />


            <Text style={styles.titlemiddle}>ANAMNESE</Text>
            <TextInput 
                    style={[styles.input, styles.textArea]}
                    placeholder="Alergias (separadas por vírgula) Ex: poeira, lactose, amendoim"
                    value={alergiasinput}
                    onChangeText={setAlergiasinput}
                    multiline
                    numberOfLines={3}
                />
            <TextInput 
                    style={[styles.input, styles.textArea]}
                    placeholder="Medicamentos (separados por vírgula)"
                    value={medicamentosinput}
                    onChangeText={setMedicamentosinput}
                    multiline
                    numberOfLines={3}
                />
            <View style={styles.switchContainer}>
                <Text style={styles.switchText}>Possui problemas posturais?</Text>
                <Switch
                    value={probposturais}
                    onValueChange={setProbposturais}
                    trackColor={{ false: '#767577', true: '#3d2f49' }}
                    thumbColor={probposturais ? '#f4f3f4' : '#f4f3f4'}
                />
            </View>
            <View style={styles.switchContainer}>
            <Text style={styles.switchText}>Possui risco cardíaco?</Text>
                <Switch
                    value={riscocardiaco}
                    onValueChange={setRiscocardiaco}
                    trackColor={{ false: '#767577', true: '#3d2f49' }}
                    thumbColor={riscocardiaco ? '#f4f3f4' : '#f4f3f4'}
                />
            </View>
            <View style={styles.switchContainer}>
            <Text style={styles.switchText}>Possui dores frequentes?</Text>
                <Switch
                    value={doresfrequentes}
                    onValueChange={setDoresfrequentes}
                    trackColor={{ false: '#767577', true: '#3d2f49' }}
                    thumbColor={doresfrequentes ? '#f4f3f4' : '#f4f3f4'}
                />
            </View>
            <TextInput 
                    style={styles.input}
                    placeholder="Contato de Emergência"
                    value={contatoemergencia}
                    onChangeText={setContatoemergencia}
                />
            <TextInput 
                    style={styles.input}
                    placeholder="Falar com:"
                    value={falarcom}
                    onChangeText={setFalarcom}
                />
            <Text style={styles.titlemiddle}>ATIVIDADE FÍSICA</Text>
            <View style={styles.switchContainer}>
            <Text style={styles.switchText}>Pratica atividade física?</Text>
                <Switch
                    value={praticaativ}
                    onValueChange={setPraticaativ}
                    trackColor={{ false: '#767577', true: '#3d2f49' }}
                    thumbColor={praticaativ ? '#f4f3f4' : '#f4f3f4'}
                />
            </View>
            {praticaativ && (
            <View>
            <TextInput 
                style={styles.input}
                placeholder="Tipo de atividade"
                value={tipoativ}
                onChangeText={setTipoativ}
            />
            <TextInput 
                style={styles.input}
                placeholder="Frequência"
                value={frequenciaativ}
                onChangeText={setFrequenciaativ}
            />
            <TextInput 
                style={styles.input}
                placeholder="Há quanto tempo?"
                value={tempo}
                onChangeText={setTempo}
            />
            </View>
            )}

            <TouchableOpacity style={styles.botao} onPress={cadastrar}>
              <Text style={styles.botaoTexto}>Cadastrar</Text>
            </TouchableOpacity>
            
            
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollcontainer:{
        flexGrow: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#eee0d3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
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
    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },
    titlemiddle: {
        fontSize: 13,
        fontWeight: '800',
        color: '#3d2f49',
        textAlign: 'center',
        textShadowColor: 'rgba(61, 47, 73, 0.3)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
        maxWidth: '85%',
        marginTop: 20
    },
    descriptionItems: {
        fontSize: 13,
        fontWeight: '800',
        color: '#3d2f49',
        textShadowColor: 'rgba(61, 47, 73, 0.3)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
        marginTop: 20,
        textAlign: 'left',
        maxWidth: '75%'
    },
    input: {
            width: '75%',
            height: 45,
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 12,
            backgroundColor: '#fff',
            marginTop: 25,
            paddingHorizontal: 10,
            fontSize: 16,
            color: '#616161',
    },
    picker: {
        width: '75%',
        height: 45,
        marginTop: 20,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        color: '#616161'
    },
    botao: {
            width: '75%',
            height: 50,
            backgroundColor: '#3d2f49',
            borderRadius: 12,
            marginTop: 40,
    },
    botaoTexto: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '75%',
        marginTop: 15,
        marginBottom: 10,
    },
    switchText: {
        fontSize: 14,
        color: '#3d2f49',
        fontWeight: '600',
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
        marginTop: 10,
    },}
    
)