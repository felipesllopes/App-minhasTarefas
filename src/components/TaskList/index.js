import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Feather } from "@expo/vector-icons"

export default function TaskList({ data, deleteItem, editItem }) {
    return (
        <View style={styles.container}>

            <TouchableOpacity style={{ marginRight: 10, }} onPress={() => deleteItem(data.key)}>
                <Feather name="trash" size={26} color={'#FFF'} />
            </TouchableOpacity>

            <View style={{ marginRight: 10 }}>
                <TouchableWithoutFeedback onPress={() => editItem(data)}>
                    <Text style={styles.task}>{data.nome}</Text>
                </TouchableWithoutFeedback>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#444',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        borderRadius: 4,
    },
    task: {
        color: 'white',
        paddingRight: 10,
        fontSize: 17,
    },
})