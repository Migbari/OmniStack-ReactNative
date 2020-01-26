import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// StyleSheet-Permite criar estilo, Text-Espaço para texto, View-Semelhante a Div

export default function App() {
  return (
    // O ReactNative não temos significado semantico
    // Não temos classes ou Id's

    // Para estlizar chamamos o atributo style com uma variável que indica o elemento a ser estilizado
    <View style={styles.container}>
      <Text style={styles.texto1}>Hello my World!!</Text>
      <Text style={text.texto2}>Hello my World!!</Text>
    </View>
  );
}

// Criou uma variável com objeto container e passou o estilo no objeto
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto1: {
    fontWeight: "bold",
    fontSize: 32,
    color: '#FFF',
  },
});

// Propriedades sem hífen e maiúscula na 2ª palavra
const text = StyleSheet.create({
  texto2: {
    color: 'blue',
    backgroundColor: '#f7F9f0',
    fontSize: 50,
  },
});



