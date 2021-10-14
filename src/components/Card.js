import React from 'react'
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

const Card = ({ item, setText, copy }) => {
    return (
        <View style={[styles.container, {borderLeftWidth: item.realizada ? 5 : 0, borderColor: item.realizada ? "#47FA0E" : null}]}>

            <View style={{width: '80%', marginVertical: 10 }}>
                <Text style={{ fontSize: 16, color: 'white' , fontStyle: 'italic'}}> {item.tarefa} </Text>
            </View>

            <View style={{ flexDirection: 'row', width: 60, marginLeft: 10, justifyContent: 'space-between' }}>

                <TouchableOpacity>
                    <AntDesign name="infocirlceo" size={18} color="#47FA0E" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setText([...copy.filter(op => op.tarefa !== item.tarefa)])}>
                    <AntDesign name="close" size={18} color="#47FA0E" />
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        marginVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 8,
        width: "90%",
        backgroundColor: '#4F4D4D'
    }
})
