import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, SafeAreaView, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, Modal, Linking, ActivityIndicator, RefreshControl } from 'react-native';
import Query from '../../Graphql/Query';
import RootStore from '../../store/rootStore';
import { DateTime } from 'luxon';

interface DropMenuType {
    list: Array<any>,
    title: String,
    onClick: (infos: any) => void
}

const { userInfo } = RootStore.getInstance();

const ModuleDetailPage = (props) => {
    const queries = new Query();
    const { t, i18n } = useTranslation();
    const [isLoading, setLoading] = useState(true);
    const [isRefreshingBooking, setRefreshBooking] = useState<boolean>(false);
    const infos = props.route.params.infos;
    const [detail, setDetails] = useState({
        inCommingActivites: [],
        passActivites: [],
        description: "",
    });

    const getModules = async () => {
        setLoading(true);
        const date = new Date()
        try {
            const data = await queries.getModuleDetails(userInfo.getToken(), infos.scolaryear, infos.code, infos.codeinstance);
            const details = data?.data?.GetModuleDetail;
            setDetails({
                title: details.title,
                description: details.description,
                inCommingActivites: details.activites?.filter(element => DateTime.fromSQL(element.end).diffNow() > 0),
                passActivites: details.activites?.filter(element => DateTime.fromSQL(element.end).diffNow() <= 0),
            });
        } catch (err) {
            console.log("GraphQL error", err, JSON.stringify(err, null, 2));
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getModules();
        console.log("nb ingooing", detail.inCommingActivites.length, "past", detail.passActivites.length)
    }, []);

    return (
        <SafeAreaView style={{ backgroundColor: "#1C9FF0", width: '100%', height: '100%', flex: 1 }} >
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshingBooking}
                        onRefresh={() => {
                            getModules().finally(() => setRefreshBooking(false))
                        }}
                    />
                }
            >
                <View style={{ margin: 10 }}>
                    <View style={styles.box}>
                        <Text style={styles.titleInfo}>{detail?.title}</Text>
                        {!isLoading &&
                            (detail?.description.length > 0 ?
                                <ScrollView style={{ margin: 10, maxHeight: 200 }} showsVerticalScrollIndicator={true}>
                                    <Text>{detail?.description}</Text>
                                </ScrollView>
                                :
                                <View style={{ margin: 10 }}>
                                    <Text>Pas de description</Text>
                                </View>)
                        }
                    </View>

                    <View style={styles.box}>
                        <Text style={styles.titleInfo}>Session</Text>
                        {!isLoading &&
                            (<View style={styles.containerDrop}>
                                <ScrollView style={{ maxHeight: 420 }} nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                                    {detail?.inCommingActivites.length > 0 ?
                                        detail?.inCommingActivites.map(element =>
                                            <View key={element.title + element.codeacti} style={styles.boxElem}>
                                                <Text style={{ marginBottom: 10 }}><Text style={{ fontSize: 15, fontWeight: "bold" }}>{t("ACTI_TITLE")}: </Text>{element.title}</Text>
                                                <Text style={{ marginBottom: 10 }}><Text style={{ fontSize: 15, fontWeight: "bold" }}>{t("ACTI_TITLE")}: </Text>{element.type_code}</Text>
                                                {/* <Text style={{ marginBottom: 10 }}><Text style={{ fontSize: 15, fontWeight: "bold" }}>{(t("ACTI_AT"))}: </Text>{format(new Date(element.begin), "dd/MM/yyyy - HH:mm")}</Text>
                                                <Text style={{ marginBottom: 10 }}><Text style={{ fontSize: 15, fontWeight: "bold" }}>{t("ACTI_UNTIL")}: </Text>{format(new Date(element.end), "dd/MM/yyyy - HH:mm")}</Text> */}
                                            </View>
                                        )
                                        :
                                        <View style={styles.boxElem} >
                                            <Text>
                                                Aucun Session
                                            </Text>
                                        </View>
                                    }
                                </ScrollView>
                            </View>)
                        }
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.titleInfo}>Session passès</Text>
                        {!isLoading &&
                            (<View style={styles.containerDrop}>
                                <ScrollView style={{ maxHeight: 420 }} nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                                    {detail?.passActivites.length > 0 ?
                                        detail?.passActivites.map(element =>
                                            <View key={element.title + element.codeacti} style={styles.boxElem} >
                                                <Text style={{ marginBottom: 10 }}><Text style={{ fontSize: 15, fontWeight: "bold" }}>{t("ACTI_TITLE")}: </Text>{element.title}</Text>
                                                <Text style={{ marginBottom: 10 }}><Text style={{ fontSize: 15, fontWeight: "bold" }}>{t("ACTI_TITLE")}: </Text>{element.type_code}</Text>
                                                {/* <Text style={{ marginBottom: 10 }}><Text style={{ fontSize: 15, fontWeight: "bold" }}>{(t("ACTI_AT"))}: </Text>{format(new Date(element.begin), "dd/MM/yyyy - HH:mm")}</Text>
                                                <Text style={{ marginBottom: 10 }}><Text style={{ fontSize: 15, fontWeight: "bold" }}>{t("ACTI_UNTIL")}: </Text>{format(new Date(element.end), "dd/MM/yyyy - HH:mm")}</Text> */}
                                            </View>
                                        )
                                        :
                                        <View style={styles.boxElem} >
                                            <Text>
                                                Aucun Session
                                            </Text>
                                        </View>
                                    }
                                </ScrollView>
                            </View>)
                        }
                    </View>
                </View>
                <Modal
                    visible={isLoading}
                    transparent={true}
                >
                    <View style={styles.centeredView}>
                        <View>
                            <View style={[styles.modalView, { width: '10%' }]}>
                                <ActivityIndicator
                                    color="#1C9FF0"
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
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
        width: "95%",
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
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        borderColor: "black",
        marginLeft: 30,
        marginRight: 30,
        width: "95%"
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

export default ModuleDetailPage;
