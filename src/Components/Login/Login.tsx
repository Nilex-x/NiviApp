import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, SafeAreaView, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, Modal, Linking, ActivityIndicator } from 'react-native';
import Logo from "../../assets/ISS_Logo.png";
import Query from '../../Graphql/Query';
import RootStore from '../../store/rootStore';


const { userInfo } = RootStore.getInstance();

const LoginPage = () => {

    const [clefAuth, setClefAuth] = useState<string>("");
    const [isEmpty, setEmpty] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);

    const queries = new Query();
    const { t } = useTranslation();

    const connectUser = async () => {
        if (clefAuth == "") {
            setEmpty(true);
        } else {
            setLoading(true);
            let key = clefAuth;
            if (clefAuth.includes("/")) {
                key = clefAuth.substring(clefAuth.indexOf("auth-"));
            }
            const data = await queries.Login(key);
            const user = data.data.Login;
            if (user.login == "") {
                setEmpty(false);
            } else {
                userInfo.login(key);
            }
            console.log("result =>", user);
        }
        setLoading(false);
    }

    const openIntra = () => {
        Linking.openURL("https://intra.epitech.eu/admin/autolog")
    }

    return (
        <SafeAreaView style={{ backgroundColor: "#1C9FF0", width: '100%', height: '100%', flex: 1 }} >
            <ScrollView scrollEnabled={true}>
                <View style={{ marginTop: 50, flex: 1, height: "100%" }}>
                    <Image source={Logo} width={20} height={20} style={{ alignSelf: "center" }} />
                    <View style={styles.box}>
                        <Text>{t("LOGIN_TITLE")}</Text>
                        <TextInput
                            accessibilityLabel={t("KEY")}
                            style={styles.text}
                            placeholder={t("KEY")}
                            autoCapitalize="none"
                            selectTextOnFocus={false}
                            value={clefAuth}
                            onChangeText={(e: string) => setClefAuth(e)}
                        />
                        <TouchableOpacity onPress={() => connectUser()} style={[styles.wrapper, styles.buttonLogin]}>
                            <Text style={[styles.textButton]}>{t("CONTINUE")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => openIntra()} style={[styles.wrapper, styles.buttonHelp, { marginBottom: -20 }]}>
                            <Text style={[styles.textButton]}>{t("GET_KEY")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <Modal
                visible={isEmpty || isLoading}
                transparent={true}
            >
                {!isLoading ?
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View>
                                <Text style={styles.titleInfo} >{t("LOGIN_ERROR_KEY")}</Text>
                                <TouchableOpacity onPress={() => setEmpty(false)} style={[styles.wrapper, styles.buttonLogin]}>
                                    <Text style={[styles.textButton]}>{t("BACK")}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    :
                    <View style={styles.centeredView}>
                        <View>
                            <View style={[styles.modalView, { width: '10%' }]}>
                                <ActivityIndicator />
                            </View>
                        </View>
                    </View>
                }
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#1C9FF0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        padding: 20,
        alignSelf: "center",
        width: "95%",
        height: 220,
        marginTop: 40,
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
});

export default LoginPage;
