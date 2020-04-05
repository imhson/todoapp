import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { Feather } from '@expo/vector-icons'

const checkStatus = (status) => {
    if (status === "success") return true;
    return false;
}

export default function TodoItem({ item, updateHandler, deleteHandler,editHandler }) {
    return (
        <View>
        <TouchableOpacity  style ={styles.item}>
                <Text
                    style={{
                    textDecorationLine: checkStatus(item.status) ? 'line-through' : 'none',
                        flex: 6,
                    
                }}
                    onPress={() => updateHandler(item.content,!checkStatus(item.status),item._id)}
                    >
                    {item.content}</Text>
                <TouchableOpacity
                style={{marginRight:7}}>
                    <Feather
                        onPress={() => editHandler(item.content,checkStatus(item.status),item._id)}
                        name='edit'
                        color='green'
                        
                    />

                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => deleteHandler(item._id)}>
                    <Feather
                    name='trash'
                    color='red'
                    
                    /></TouchableOpacity>
            
            </TouchableOpacity>
            </View>
    )
}
const styles = StyleSheet.create({
    item: {
        padding: 10,
        marginBottom: 10,
        borderColor: '#bbb',
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        borderWidth: 1,
        borderRadius: 5,
        color: 'red'
    }
});

