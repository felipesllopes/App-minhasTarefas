import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import firebase from "../../services/firebaseConnection"

export default function Login({ changeStatus }) {

    const [type, setType] = useState("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin() {

        if (type === 'login') {

            if (email === "" || password === "") {
                alert("Preencha os campos");
                return;
            }

            // fazer o login
            const user = firebase.auth().signInWithEmailAndPassword(email, password)
                .then((user) => {
                    changeStatus(user.user.uid)
                    setEmail(""); setPassword("");
                })
                .catch((err) => {
                    console.log(err)
                    alert("Ops! Parece que deu algum erro");
                    return;
                })

        } else {
            // cadastrar o usuário
            const user = firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((user) => {
                    changeStatus(user.user.uid)
                    alert("Usuário cadastrado com sucesso!")
                    setEmail(""); setPassword("");
                })
                .catch((err) => {
                    console.log(err)
                    alert("Ops! Parece que deu algum erro");
                    return;
                })
        }
    }

    return (
        <View style={styles.container}>

            <Image source={require('../../img/logo.png')} style={styles.logo} />

            <TextInput
                style={styles.textInput}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />

            <TextInput
                style={styles.textInput}
                placeholder="Senha"
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />

            <TouchableOpacity style={styles.handleLogin} onPress={handleLogin}>
                <Text style={styles.loginText}>
                    {type === 'login' ? 'Acessar' : 'Cadastrar'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                setType(type === 'login' ? 'cadastrar' : 'login')
                setEmail(""); setPassword("");
            }}>
                <Text style={{ textAlign: 'center', fontSize: 17, }}>
                    {type === 'login' ? 'Criar uma conta' : 'Já possuo uma conta'}
                </Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ADD8E6',
        padding: 10,
    },
    logo: {
        height: 196,
        width: 241,
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 60,
    },
    textInput: {
        borderWidth: 3,
        padding: 10,
        backgroundColor: 'white',
        fontSize: 18,
        borderRadius: 6,
        marginBottom: 20,
    },
    handleLogin: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        marginVertical: 15,
        borderRadius: 6,
        borderWidth: 3,
        backgroundColor: '#3ea6f2'
    },
    loginText: {
        color: 'white',
        fontSize: 19,
        fontWeight: 'bold'
    },
})