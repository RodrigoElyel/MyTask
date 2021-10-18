import React from 'react';
import Constants from 'expo-constants'

import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Touchable } from 'react-native';

// Components
import Card from './src/components/Card';

// React-Native-Paper
import { Modal, Portal, Provider, ProgressBar } from 'react-native-paper';




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
  const [currentItem, setCurrentItem] = React.useState('')
  const [data, setData] = React.useState(text)
  const [visible, setVisible] = React.useState(false);
  const [progress, setProgress] = React.useState();



  const adicionar = () => {
    setText([...text, { tarefa: currentText, realizada: false }])
  }

  const inProgress = () => {
    let count = 0

    if (text.length === 0){
      console.log('entrou aqui')
      setProgress(0)
      return
    }

    text.map(item => {
      item.realizada && count++
    })



    console.log({ count })
    setProgress(count / text.length)
  }


  const toque = (item, index) => {

    // Maneira 1
    // item.realizada = !item.realizada
    // setText([...text.filter(op => op.tarefa !== item.tarefa), item])

    // Maneira 2
    const newText = text.map((it, i) => {
      if (it.tarefa === item.tarefa) {
        return { ...it, realizada: !it.realizada }
      }
      return it
    });

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
          <Card
            item={item}
            setText={setText}
            copy={text}
            setVisible={setVisible}
            visible={visible}
            setCurrentItem={setCurrentItem}
          />
        </TouchableOpacity>
      )
    )
  }



  React.useEffect(() => {
    inProgress()
  }, [text])


  const RetornarModal = () => {
    return (
      <Provider>
        <Portal>
          <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={styles.modal}>
            <Text style={{ fontSize: 16, color: 'white', fontStyle: 'italic', flexGrow: 0.5 }}> Mais informações </Text>
            <Text style={{ fontSize: 16, color: 'white', fontStyle: 'italic' }}> {currentItem.tarefa} </Text>
            <Text style={{ fontSize: 16, color: 'white', fontStyle: 'italic' }}> {currentItem.tarefa} </Text>
            <Text style={{ fontSize: 16, color: 'white', fontStyle: 'italic' }}> {currentItem.tarefa} </Text>
            <Text style={{ fontSize: 16, color: 'white', fontStyle: 'italic' }}> {currentItem.tarefa} </Text>
            <Text style={{ fontSize: 16, color: 'white', fontStyle: 'italic' }}> {currentItem.tarefa} </Text>
          </Modal>
        </Portal>
      </Provider>
    )
  }

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

      <RetornarModal />

      <View style={{ margin: 20 }}>
        <Text style={{ fontSize: 16, color: "white", fontWeight: 'bold', alignSelf: 'center', marginBottom: 10 }}>{`${(progress*100).toFixed(0)}%`}</Text>
        <ProgressBar progress={progress} color={"#47FA0E"} />

      </View>


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
    height: "80%",
    marginTop: 10,
  },
  modal: {
    alignSelf: 'center',
    width: "80%",
    height: "30%",
    borderWidth: 1,
    borderColor: '#47FA0E',
    borderRadius: 8,
    backgroundColor: '#4F4D4D',
    padding: 10,
  }
});
