import { StatusBar, StyleSheet, View } from 'react-native';
import Tarefas from './src/home';

export default function App() {
  return (
    <View style={styles.container}>
      <Tarefas />
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
