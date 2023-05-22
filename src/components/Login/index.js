import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login() {

    const [type, setType] = useState("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin() {

    }

    return (
        <View style={styles.container}>

            <Text style={styles.text}>Email</Text>
            <TextInput
                style={styles.textInput}
                placeholder="joao@hotmail.com"
                keyboardType="email-address"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />

            <Text style={styles.text}>Senha</Text>
            <TextInput
                style={styles.textInput}
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />

            <TouchableOpacity style={[styles.handleLogin, { backgroundColor: type === 'login' ? '#3ea6f2' : '#141414' }]} onPress={handleLogin}>
                <Text style={styles.loginText}>
                    {type === 'login' ? 'Acessar' : 'Cadastrar'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setType(type === 'login' ? 'cadastrar' : 'login')}>
                <Text style={{ textAlign: 'center' }}>
                    {type === 'login' ? 'Criar uma conta' : 'Já possuo uma conta'}
                </Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 17,
        marginVertical: 4,
    },
    textInput: {
        borderWidth: 3,
        padding: 10,
        backgroundColor: 'white',
        fontSize: 18,
    },
    handleLogin: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        marginVertical: 15,
    },
    loginText: {
        color: 'white',
        fontSize: 17,
    },
})