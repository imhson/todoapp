import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, View } from 'react-native';

export default function AddTodo({submitHandler}) {
    const [text, setText] = useState('');
    const changeHandler = (val) => {
        setText(val);
    };
    return (
        <View
         style={styles.input}>
            <View style={{flex:5}}>
            <TextInput 
                placeholder='New todo...'
                onChangeText={changeHandler}
            />
            </View>
            <View style={{flex:1}}>
                <Button
                    style={styles.btn}
                    onPress={() => submitHandler(text)}
                title='ADD'
            />
           </View>
        </View>
    )
}
const styles = StyleSheet.create({
    input: {
        marginBottom: 20,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
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