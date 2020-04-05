import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, Button, TextInput, Text } from 'react-native';
import Modal from 'react-native-modal';

export default function ModalEdit({isVisible, item}) {
    const [edit, setEdit] = useState([]);
    const [modalOpen, setModalOpen] = useState(isVisible);
    const [text, setText] = useState('');
    const changeHandler = (val) => {
        setText(val);
    };
    const closeModal = () => {
        setModalOpen(false)
    }
    
    return (
        <Modal
				visible={modalOpen}
				animationType='slide'>
				<View style={styles.modal}>
					<Text style={styles.modalHeader}>Chỉnh sửa</Text>
				<View style={styles.input}>
					<TextInput
                        onChangeText={changeHandler}
                        defaultValue={item}
					/>
				</View>
					<View style={styles.btn}>
						<View style={{ flex: 1 }}></View>
						<TouchableOpacity style={styles.btnConfirm}>
						<Button
								title='Confirm'
								color='white'
								
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
    )
}
const styles = StyleSheet.create({
	input: {
		marginHorizontal:10,
        marginBottom: 20,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
	},
	btn: {
		flexDirection: 'row',
	},
	btnClose: {
		borderWidth: 1,
		borderRadius:10,
		borderColor: 'red',
		width: 100,
		backgroundColor: 'red',
		
	},
	btnConfirm: {
		borderWidth: 1,
		borderRadius:10,
		borderColor: 'blue',
		width: 100,
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