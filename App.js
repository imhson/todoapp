import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Button, TextInput, Text } from 'react-native';
import Modal from 'react-native-modal';
import Header from './components/header';
import TodoItem from './components/todoItem';
import AddTodo from './components/addTodo';
import { getTodosApi, updateTodoApi, createTodoApi, deleteTodoApi } from './api/todoAPIs';
export default function App() {
	const [todos, setTodos] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [edit, setEdit] = useState([]);
	const [editText, setEditText] = useState('');
	const editHandler = (content, isChecked, Id) => {
		setEditText(content);
		setEdit({ content, isChecked, Id });
		setModalOpen(true);
	}
	const changeHandler = (content) => {
		setEditText(content);
	}
	const getTodos = async () => {
        try {
            const todosData = await getTodosApi();
            setTodos(todosData);
        } catch (err) {
            console.log(err)
            alert("Reset Todo: ", err.message);
        }
	}
	
	const updateHandler = async (content, isChecked, Id) => {
        try {
			const status = isChecked ? "success" : "in process";
            const res = await updateTodoApi(Id, content, status);
			await getTodos();
			
			alert(res);
			
        } catch (err) {
            alert("Update Todo: ", err.message);
        }
    }
	
	const deleteHandler = async (Id) => {
		try {
			console.log("clicked");
			const res = await deleteTodoApi(Id);
			await getTodos();
			alert(res);
		} catch (err) {
			alert("Delete Todo: ", err.message)
		}
	};

	const submitHandler = async (content) => {
		try {
            const res = await createTodoApi(content, "in process");
			await getTodos();
			
			alert(res);

        } catch (err) {
            alert("Create Todo: ", err.message)
        }
		
	};
	useEffect(() => {
        getTodos().then();
    }, [])

	return (
	
		<View style={styles.container}>
			
			<Modal
				visible={modalOpen}
				animationType='slide'>
				<View style={styles.modal}>
					<Text style={styles.modalHeader}>Chỉnh sửa</Text>
				<View style={styles.input}>
					<TextInput
                        onChangeText={changeHandler}
                        defaultValue={editText}
					/>
				</View>
					<View style={styles.btn}>
						<View style={{ flex: 1 }}></View>
						<TouchableOpacity style={styles.btnConfirm}>
						<Button
								title='Confirm'
								color='white'
								onPress={() => {
									updateHandler(editText, edit.isChecked, edit.Id)
									//setModalOpen(false);
								}}
						/>
					</TouchableOpacity>
					<TouchableOpacity style={styles.btnClose}>
						<Button
                            title='Close'
                            color='white'
                            onPress={() => setModalOpen(false)}
						/>
					</TouchableOpacity>
				</View>
				</View>
			</Modal>
				

			<Header />
			<View style={styles.content}>
				<AddTodo submitHandler={submitHandler}/>
				<View style={{flex:1}}>
					<FlatList
						data={todos}
						keyExtractor={item => item._id}
							renderItem={({ item }) =>
								<TodoItem
									item={item}
									updateHandler={updateHandler}
									deleteHandler={deleteHandler}
									editHandler={editHandler}
								/>}
					/>
				</View>
			</View>
			
		</View>
		
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
	},
	content: {
		padding: 20,
	},
	input: {
		marginHorizontal:10,
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
	},
	btn: {
		flexDirection: 'row',
		marginRight:6
	},
	btnClose: {
		borderWidth: 1,
		borderRadius:10,
		borderColor: 'red',
		width: 60,
		backgroundColor: 'red',
		
	},
	btnConfirm: {
		borderWidth: 1,
		borderRadius:10,
		borderColor: 'blue',
		width: 90,
		backgroundColor: 'blue',
		
	},
	modal: {
		height: 120,
		borderWidth: 1,
		borderRadius:10,
		backgroundColor: 'white',
		
	},
	modalHeader: {
		margin:10,
        fontSize: 20,
        fontWeight: 'bold'
	}
});
