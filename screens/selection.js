import { StyleSheet, View, Button } from "react-native";
export default function Selection({navigation}){
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="Já tenho cadastro"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="Quero me cadastrar"
        onPress={() => navigation.navigate('signUp')}
      />
    </View>
    );
}