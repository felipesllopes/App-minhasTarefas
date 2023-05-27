import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { useState } from "react";
import { Keyboard } from "react-native";
import firebase from ".././services/firebaseConnection";
import Login from "../components/Login";
import TaskList from "../components/TaskList";

export default function Tarefas() {

    const [user, setUser] = useState(null);
    const [task, setTask] = useState([]);
    const [newTask, setNewTask] = useState("");

    if (!user) {
        return <Login changeStatus={(user) => setUser(user)} />
    }

    function handleAdd() {
        if (newTask === "") {
            return;
        }

        let tarefas = firebase.database().ref('tarefas').child(user);
        let chave = tarefas.push().key;

        tarefas.child(chave).set({
            nome: newTask
        })
            .then(() => {
                const data = {
                    key: chave,
                    nome: newTask
                }

                Keyboard.dismiss();
                setNewTask("");
                setTask(previousTasks => [...previousTasks, data])

            });
    }

    function handleDelete(key) {
        console.log(key)
    }

    function handleEdit(data) {
        console.log("ITEM CLICADO", data)
    }


    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.containerInput}>

                <TextInput
                    style={styles.input}
                    placeholder="O que irá fazer hoje?"
                    value={newTask}
                    onChangeText={(text) => setNewTask(text)}
                />
                <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>

            </View>

            <FlatList
                data={task}
                keyExtractor={item => item.key}
                renderItem={({ item }) => <TaskList data={item} deleteItem={handleDelete} editItem={handleEdit} />}
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        flex: 1,
        borderWidth: 2,
        padding: 10,
        fontSize: 18,
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 5,
    },
    buttonAdd: {
        height: 50,
        backgroundColor: '#444',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
        paddingHorizontal: 16,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 22,
    },
})