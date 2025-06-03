import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ScrollView, Platform, Alert } from 'react-native';
import { Appbar, Avatar, Text, TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { API_IP } from '@env';

export default ({ navigation, route }) => {

    const [title, setTitle] = useState('');
    const { grupoInfo } = route.params
    const [description, setDescription] = useState('');
    const [dateText, setDateText] = useState('');    // DD/MM/YYYY
    const [timeText, setTimeText] = useState('');    // HH:MM
    const [duration, setDuration] = useState('');

    // Controle do picker
    const [showPicker, setShowPicker] = useState(false);
    const [pickerMode, setPickerMode] = useState('date'); // 'date' ou 'time'

    const showMode = mode => {
        setPickerMode(mode);
        setShowPicker(true);
    };

    const onChange = (event, selected) => {
        setShowPicker(false);
        if (!selected) return;
        const dt = new Date(selected);
        if (pickerMode === 'date') {
            const day = String(dt.getDate()).padStart(2, '0');
            const month = String(dt.getMonth() + 1).padStart(2, '0');
            const year = dt.getFullYear();
            setDateText(`${day}/${month}/${year}`);
        } else {
            const hour = String(dt.getHours()).padStart(2, '0');
            const minute = String(dt.getMinutes()).padStart(2, '0');
            setTimeText(`${hour}:${minute}`);
        }
    };

    const criaEvento = async () => {
        try {
            const response = await fetch(`${API_IP}/eventos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    titulo: title,
                    descricao: description,
                    dataEvento: dateText,
                    tipo: 'grupo',
                    donoId: grupoInfo._id,
                    dataFimEvento: duration,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                Alert.alert('Cadastro de Evento realizado com sucesso!');
                navigation.navigate('myGroups', {
                    screen: 'MyGroups'
                });
            } else {
                Alert.alert('Erro ao cadastrar Evento', data.message || 'Erro desconhecido');
            }
        } catch (error) {
            console.error('Erro no cadastro de Evento:', error.message || error);
            Alert.alert('Erro de conexão com o servidor', error.message || 'Verifique sua rede');
        }
    }


    return (
        <View style={styles.root}>
            <Appbar.Header style={styles.appBarHeader} mode="center-aligned">
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content
                    titleStyle={styles.appBarTitle}
                    title={`Novo Evento - ${grupoInfo.nome}`}
                />
            </Appbar.Header>
            <ScrollView style={[styles.form]}>
                <TextInput
                    label='Título'
                    value={title}
                    style={styles.input}
                    onChangeText={setTitle}
                />

                {/* Descrição */}
                <TextInput
                    label="Descreva o evento"
                    value={description}
                    onChangeText={setDescription}
                    multiline={true}
                    numberOfLines={8}
                    style={[styles.input, styles.description]}
                />

                {/* Data */}
                <TouchableOpacity onPress={() => showMode('date')}>
                    <TextInput
                        placeholder='Data'
                        value={dateText}
                        editable={false}
                        showSoftInputOnFocus={false}
                        style={styles.input}
                        right={<TextInput.Icon icon="calendar" />}
                    />
                </TouchableOpacity>

                {/* Hora */}
                <TouchableOpacity onPress={() => showMode('time')}>
                    <TextInput
                        placeholder='Horário'
                        value={timeText}
                        editable={false}
                        showSoftInputOnFocus={false}
                        style={styles.input}
                        right={<TextInput.Icon icon="clock" />}
                    />
                </TouchableOpacity>


                {/* Duração */}

                <TextInput
                    placeholder="Duração Ex: 60"
                    keyboardType="numeric"
                    value={duration}
                    style={styles.input}
                    onChangeText={setDuration}
                />

                {
                    showPicker && (
                        <DateTimePicker
                            value={new Date()}
                            mode={pickerMode}
                            display={Platform.OS === 'android' ? 'spinner' : 'default'}
                            is24Hour={true}
                            onChange={onChange}
                        />
                    )
                }

                {/* Botão Próximo */}
                <TouchableOpacity style={styles.nextButton} onPress={() => criaEvento()}>
                    <Text style={styles.nextButtonText}>Próximo</Text>
                </TouchableOpacity>
            </ScrollView>
        </View >
    )
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
    },
    root: {
        flex: 1,
        backgroundColor: '#fff'
    },
    appBarHeader: {
        backgroundColor: '#fff',
        borderBottomColor: '#EEEEEE',
        borderBottomWidth: 1,
    },
    appBarTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    form: {
        flex: 1,
        paddingHorizontal: 8,
        margin: 8,
        flexGrow: 1
    },
    input: {
        marginVertical: 8,
        fontSize: 16,
    },

    description: {
        minHeight: 120
    },
    nextButton: {
        marginTop: 32,
        backgroundColor: '#8A2BE2',
        paddingVertical: 15,
        marginHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    nextButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
})