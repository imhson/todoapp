import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button} from 'react-native';

export default function TodoItem({ item, pressHandler, deleteHandler }) {
    return (
        <View>
        <TouchableOpacity  style ={styles.item}>
                <Text
                    style={{
                    textDecorationLine: item.complete ? 'line-through' : 'none',
                    flex:5
                }}
                    onPress={() => pressHandler(item.key)}
                    >
                    {item.text}</Text>
                    <Button
                    style={{ flex: 1 }}
                    color='red'
                    onPress ={()=>deleteHandler(item.key,item.text)}
                    title='Delete'
                    />
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

