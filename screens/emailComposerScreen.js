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
    
  }

}