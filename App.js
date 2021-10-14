import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Touchable } from 'react-native';
import Card from './src/components/Card';
import Constants from 'expo-constants'

export default function App() {

  const lista = [
    {
      tarefa: 'Fazer trabalho de TCC1',
      realizada: false
    },
    {
      tarefa: 'Malhar perna hoje',
      realizada: false
    }
  ]

  const [text, setText] = React.useState(lista)
  const [currentText, setCurrentText] = React.useState()
  const [data, setData] = React.useState(text)



  const adicionar = () => {
    setText([...text, { tarefa: currentText, realizada: false }])
  }

  const toque = (item, index) => {

    // Maneira 1
    // item.realizada = !item.realizada
    // setText([...text.filter(op => op.tarefa !== item.tarefa), item])
    
    // Maneira 2
    const newText = text.map( (it, i) => {
      if(it.tarefa === item.tarefa){
        return { ... it, realizada: !it.realizada}
      } 
      return it
    });
    console.log("newText")
    console.log(newText)
    setText(newText)

  }

  const RetornarCard = ({ condition }) => {
    return (

      // Maneira 1
      // text.map((item, index) =>
      // (condition === item.realizada ?
      //   <TouchableOpacity key={item.tarefa} onPress={() => toque(item, index)}>
      //     <Card item={item} setText={setText} copy={text} />
      //   </TouchableOpacity>
      //   : null
      // ))

      // Maneira 2
      text.map((item, index) =>
        <TouchableOpacity key={item.tarefa} onPress={() => toque(item, index)}>
          <Card item={item} setText={setText} copy={text} />
        </TouchableOpacity>
      )
    )
  }

  // console.log(text)

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold', marginHorizontal: 20 }}>Minhas Tarefas</Text>

      <View style={{ flexDirection: 'row', marginVertical: 10, width: '90%', alignSelf: 'center', justifyContent: 'space-between' }}>

        <View style={styles.search}>
          <TextInput
            style={{ color: 'white' }}
            placeholder='Digite a nova tarefa'
            placeholderTextColor='white'
            onChangeText={value => setCurrentText(value)}

          />
        </View>

        <TouchableOpacity onPress={() => adicionar()}>
          <View style={{ alignSelf: 'center', padding: 10, borderRadius: 8, backgroundColor: "#47FA0E" }}>
            <Text style={{ fontSize: 16, color: "black", fontWeight: 'bold' }}>{"Adicionar"}</Text>
          </View>
        </TouchableOpacity>

      </View>

      {/* Maneira 1 */}
      {/* <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', marginHorizontal: 20 }}> ● Pendentes</Text>
      <ScrollView style={styles.scroll}>
        <RetornarCard condition={false} />
      </ScrollView>

      <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', marginHorizontal: 20 }}> ● Finalizados</Text>
      <ScrollView style={styles.scroll}>
        <RetornarCard condition={true} />
      </ScrollView> */}

      {/* Maneira 2 */}
      <ScrollView style={styles.scroll}>
        <RetornarCard />
      </ScrollView>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#322F2E',
    paddingTop: Constants.statusBarHeight,
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: "72%",
    paddingLeft: 8,
    borderRadius: 8,
    backgroundColor: '#4F4D4D',
  },
  scroll: {
    height: 1,
    marginTop: 10,
  }
});
