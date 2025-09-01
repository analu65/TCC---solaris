import { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../controller";

const EmailComposerScreen = () => {
  const [assunto, setAssunto] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [totalEmails, setTotalEmails] = useState(0);

  useEffect(() => {
    buscarEmailsDoFirebase()
  }, []);

  const buscarEmailsDoFirebase = async () => {
    try{
        const usersRef = collection(db, 'users');
        const snapshot = await getDocs(usersRef);

        const emailsList = [];
        snapshot.forEach(doc => {
            const userData  = doc.data();
            if (userData.email){
                emailsList.push({
                    email: userData.email,
                    name: userData.name || userData.nome || 'Usuário',
                    id: doc.id
                });
            }
        });
        setUsuarios(emailsList);
        setTotalEmails(emailsList.length);
        }catch (error){
            console.error('Erro ao buscar emails', error);
            Alert.alert('Erro', 'Não foi possível carregar os emails dos usuários');

        }
    };
    const enviarEmails = async () => {
        if (!assunto.trim() || !mensagem.trim()) {
            Alert.alert('Atenção', 'Preencha o assunto e a mensagem');
            return;
        }
        //
        if (usuarios.length == 0){
        Alert.alert('Atenção', 'Nenhum email encontrado no banco de dados');
        return;
    }
    //confirma envio
    Alert.alert('Confirmar envio', `Enviar email para ${totalEmails} pessoas?`, [
        {text: 'Cancelar', style: 'cancel'}
        {text: 'Enviar', onPress: confirmarEnvio }
    ]);
    };
    const confirmarEnvio = async () => {
        setEnviando(true);
        try {
            const response = await fetch('https://us-central1-tcc--solaris.cloudfunctions.net/sendBulkEmails', {method:'POST', headers: {'Content-Type': 'application/json', }, body: JSON.stringify({
                assunto: assunto,
                mensagem: mensagem,
                emails: usuarios.map(u => ({email: u.email, name: u.name}))
            })
         }); //verificar se é central 1 mesmo
         const result = await response.json();
         if (result.success) {
            Alert.alert('Sucesso!',`Emails enviados para ${result.totalEnviados} pessoas`,
          [{ text: 'OK', onPress: limparFormulario }]
         );
         } else {
            throw new Error(result.error || 'Erro desconhecido');
         } 
        }catch(error){
            console.error('Erro no envio', error);
            Alert.alert('Erro', 'Não foi possível enviar os emails. Tente novamente');
         } finally {
            setEnviando(false);
         }
    };
    const limparFormulario = () => {
        setAssunto('');
        setMensagem('');
    };
    const previewEmail = () => {
        Alert.alert('Preview do email', `Assunto: ${assunto}\n\nMensagem:\n${mensagem}\n\nSerá enviado para: ${totalEmails} pessoas`);
    };
    return (
        <KeyboardAvoidingView>
            
        </KeyboardAvoidingView>
    )
    
  }
