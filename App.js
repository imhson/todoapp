import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image,Keyboard } from 'react-native';
import Header from './components/header';
import TodoItem from './components/todoItem';
import AddTodo from './components/addTodo';
import { Root, Toast } from 'popup-ui'

export default function App() {
	const [todos, setTodos] = useState([]);
	const pressHandler = (key) => {
		
		setTodos(
			todos.map(
				(todo) => 
					todo.key===key & !todo.complete
					? {
						...todo,
						complete: !todo.complete
						}
						: todo
			)
		);
	};
	const longPressHandler = (key,text) => {
		setTodos(prevTodos => {
			Toast.show({
                title: text+' deleted',
                text: 'Không làm mà đòi có ăn thì ăn cứt',
                color: '#e74c3c',
                timing: 2000,
                icon: <Image source={require('.//assets//tick.png')} style={{ width: 25, height: 25 }} resizeMode="contain" />
              })
			return prevTodos.filter(todo => todo.key != key);
		});
	};
	const deleteHandler = (key,text) => {
		setTodos(prevTodos => {
			Toast.show({
                title: text+' deleted',
                text: 'Không làm mà đòi có ăn thì ăn cứt',
                color: '#e74c3c',
                timing: 2000,
                icon: <Image source={require('.//assets//tick.png')} style={{ width: 25, height: 25 }} resizeMode="contain" />
              })
			return prevTodos.filter(todo => todo.key != key);
		});
	};

	const submitHandler = (text) => {
		text!=''?
		setTodos((prevTodos) => {
			Toast.show({
				title: text+' created',
				text: 'Không làm mà đòi có ăn thì ăn cứt',
				color: '#2ecc71',
				timing: 2000,
				icon: <Image source={require('.//assets//tick.png')} style={{ width: 25, height: 25 }} resizeMode="contain" />
			})
			Keyboard.dismiss()
				return [
					{ text: text, complete: false, key: Math.random().toString() },
					...prevTodos
				]
				
			
		}):""
	};

	return (
	<Root>
		<View style={styles.container}>
			<Header />
			<View style={styles.content}>
				<AddTodo submitHandler={submitHandler}/>
				<View style={styles.list}>
					<FlatList
						data={todos}
						renderItem={({ item }) => <TodoItem item={item} pressHandler={pressHandler} deleteHandler={deleteHandler}/>}
					/>
				</View>
			</View>
			
		</View>
		</Root>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	content: {
		padding: 20,
	},
});
