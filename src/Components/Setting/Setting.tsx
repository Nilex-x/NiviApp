import React, { useReducer, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, SafeAreaView, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, Modal, Linking, ActivityIndicator } from 'react-native';
import Query from '../../Graphql/Query';
import RootStore from '../../store/rootStore';
import Button from '../Utils/Button';
import SwitchSelector from 'react-native-switch-selector';
import { Checkbox } from 'react-native-paper';

const { userInfo } = RootStore.getInstance();


const SettingPage = () => {
    const queries = new Query();
    const { t, i18n } = useTranslation();
    const [langSelected, setLang] = useState<string | any>(i18n.language);
    const [isChecked, setCheck] = useState<boolean>(userInfo.goToTop);

    const logout = async () => {
        await userInfo.logout();
    }

    const changeLang = (lang: string) => {
        i18n.changeLanguage(lang);
    }

    const options = [
        { label: t("FR"), value: "fr" },
        { label: t("EN"), value: "en" }
    ];

    const setChecked = (value: boolean) => {
        setCheck(value);
        userInfo.setGoToTop(value);
    }

    return (
        <SafeAreaView style={{ backgroundColor: "#1C9FF0", width: '100%', height: '100%', flex: 1 }} >
            <ScrollView>
                <View style={styles.box}>
                    <SwitchSelector
                        options={options}
                        initial={0}
                        buttonColor="#1C9FF0"
                        onPress={(value: string) => changeLang(value)}
                    />
                </View>
                <View style={styles.box}>
                    <Text style={{ fontSize: 18, marginBottom: 10, textDecorationLine: "underline" }}>Accessibilité</Text>
                    <View style={styles.spaceBet}>
                        <Checkbox.Android
                            status={isChecked ? 'checked' : 'unchecked'}
                            onPress={() => setChecked(!isChecked)}
                            color="#1C9FF0"
                        />
                        <Text>Got To Top Home Page</Text>
                    </View>
                </View>
                <View style={styles.box}>
                    <Button title={t("DECONNECT")} onClick={logout} styleButton={{ width: '100%' }} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        padding: 20,
        alignSelf: "center",
        width: "98%",
        marginTop: 20,
        backgroundColor: "white",
        alignItems: "center",
        borderRadius: 10,
        shadowOpacity: 0.3,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
    },
    text: {
        marginTop: 10,
        height: "20%",
        width: "100%",
        borderWidth: 1,
        borderColor: "#1C9FF0",
        borderRadius: 20,
        textAlign: "center",
        paddingLeft: 10,
        color: "black",
        fontSize: 17,
    },
    buttonLogin: {
        width: '100%',
        backgroundColor: "#1C9FF0"
    },
    buttonHelp: {
        width: '100%',
        backgroundColor: "red"
    },
    wrapper: {
        backgroundColor: "blue",
        height: 40,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginTop: 10,
    },
    textButton: {
        color: "white",
        fontWeight: "bold",
        fontSize: 17,
    },
    centeredView: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        width: '80%',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    titleInfo: {
        fontSize: 20,
        textAlign: "center",
    },
    containerDrop: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10
    },
    spaceBet: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    boxElem: {
        padding: 20,
        alignSelf: "center",
        width: "100%",
        marginTop: 20,
        backgroundColor: "white",
        alignItems: "flex-start",
        borderRadius: 10,
        borderWidth: 0.8,
        borderColor: "#1C9FF0"
    }
});

export default SettingPage;
