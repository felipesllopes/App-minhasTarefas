import Feather from "@expo/vector-icons/Feather";
import { useEffect, useRef, useState } from "react";
import { FlatList, Keyboard, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
import firebase from ".././services/firebaseConnection";
import Login from "../components/Login";
import TaskList from "../components/TaskList";

export default function Tarefas() {

    const [user, setUser] = useState(null);
    const [task, setTask] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [key, setKey] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {

        if (!user) {
            return;
        }

        firebase.database().ref('tarefas').child(user).once('value', (snapshot) => {

            setTask([]);

            snapshot?.forEach((childItem) => {
                let data = {
                    key: childItem.key,
                    nome: childItem.val().nome
                }
                setTask(previousTasks => [...previousTasks, data])
            })
        })

    }, [user])

    function handleAdd() {
        if (newTask === "") {
            return;
        }

        // entrará nessa condição se o usuário estiver editando uma tarefa. Ela é modificada na função handleEdit
        if (key !== '') {
            firebase.database().ref('tarefas').child(user).child(key).update({
                nome: newTask
            })
                .then(() => {
                    const taskIndex = task.findIndex((item) => item.key === key);
                    const taskClone = task;
                    taskClone[taskIndex].nome = newTask;

                    setTask([...taskClone]);
                })

            Keyboard.dismiss();
            setNewTask('');
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
        firebase.database().ref('tarefas').child(user).child(key).remove()
            .then(() => {
                const findTasks = task.filter(item => item.key !== key);
                setTask(findTasks);
            })
    }

    function handleEdit(data) {
        setKey(data.key);
        setNewTask(data.nome);
        inputRef.current.focus();
    }

    function cancelEdit() {
        setKey("");
        setNewTask("");
        Keyboard.dismiss();
    }

    async function handleLogout() {
        await firebase.auth().signOut();
        setUser(null)
    }

    if (!user) {
        return <Login changeStatus={(user) => setUser(user)} />
    }

    return (
        <SafeAreaView style={styles.container}>

            {key.length > 0 &&
                (<View style={{ flexDirection: 'row', marginBottom: 8, alignItems: 'center' }}>
                    <TouchableOpacity onPress={cancelEdit}>
                        <Feather name="x-circle" size={26} color={"red"} />
                    </TouchableOpacity>
                    <Text style={{ marginLeft: 5, fontSize: 15.5, color: '#FFF' }}>Você está editando uma tarefa</Text>
                </View>)
            }

            <View style={styles.containerInput}>
                <TextInput
                    style={styles.input}
                    placeholder="O que irei fazer hoje?"
                    value={newTask}
                    onChangeText={(text) => setNewTask(text)}
                    ref={inputRef}
                />
                <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>

            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                data={task}
                keyExtractor={item => item.key}
                renderItem={({ item }) => <TaskList data={item} deleteItem={handleDelete} editItem={handleEdit} />}
            />

            <TouchableOpacity style={styles.logout} activeOpacity={0.7} onPress={handleLogout}>
                <Text style={styles.logoutText}>Desconectar</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#4B0082',
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
        backgroundColor: '#FFF'
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
        color: '#FFF',
        fontSize: 22,
    },
    logout: {
        backgroundColor: '#FF0000',
        paddingVertical: 10,
        marginVertical: 10,
        borderRadius: 4,
    },
    logoutText: {
        fontSize: 18,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: 'bold',
    },
})