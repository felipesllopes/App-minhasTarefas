import { StyleSheet, Text, View } from "react-native";

import { useState } from "react";
import Login from "../components/Login";

export default function Home() {

    const [user, setUser] = useState(null);

    if (!user) {
        return <Login />
    }

    return (
        <View style={styles.container}>

            <Text>Essa é a tela home</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})