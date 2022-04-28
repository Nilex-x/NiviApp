import { keys } from 'mobx';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, SafeAreaView, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, Modal, Linking, ActivityIndicator, RefreshControl } from 'react-native';
import Query from '../../Graphql/Query';
import RootStore from '../../store/rootStore';
import RNPickerSelect from 'react-native-picker-select';

const { userInfo } = RootStore.getInstance();

interface infosUser {
    credits: number;
    firstname: string;
    gpa: number;
    lastname: string;
    login: string;
    picture: string;
    promo: number;
    scolaryear: string;
    semester: number;
    studentyear: string;
}

const ProfilPage = () => {
    const queries = new Query();
    const { t, i18n } = useTranslation();
    const [infos, setInfos] = useState<infosUser | any>();
    const [isRefreshingBooking, setRefreshBooking] = useState<boolean>(false);
    const [marksDate, setMarksDate] = useState<any>([])
    const [marksModules, setMarksModules] = useState<any>([])
    const [selectedDate, setSelectedDate] = useState();
    const [selectedModule, setSelectedModule] = useState();
    const [isLoading, setLoading] = useState(true);

    const getInfo = async () => {
        setLoading(true);
        try {
            const temp: Array<any> = []
            const data = await queries.getUserInfo(userInfo.getToken());
            const dataMarks = await queries.getMarksDate(userInfo.getToken());
            const infos = data?.data?.GetUserInfo;
            const marksDate = dataMarks?.data?.GetMarks
            setInfos(infos);
            setMarksModules(marksDate.module?.map(element => {
                if (!temp.find(tempElement => tempElement.label == element.scolaryear))
                    temp.push({label: element.scolaryear, value: element.scolaryear})
                return ({label: element.title, value: element.title})
            }))
            setMarksDate(temp);
        } catch (err) {
            console.log("GraphQl error => ", err);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getInfo();
    }, [])

    return (
        <SafeAreaView style={{ backgroundColor: "#1C9FF0", width: '100%', height: '100%', flex: 1 }} >
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshingBooking}
                        onRefresh={() => {
                            getInfo().finally(() => setRefreshBooking(false))
                        }}
                    />
                }
            >
                <View style={styles.box}>
                    <View style={styles.sameLine}>
                        <Image source={{ uri: infos?.picture }} style={{ width: 150, height: 200, borderRadius: 10 }} />
                        <View style={styles.betColumn}>
                            <Text>{t("PROFIL_FIRSTNAME")}: {infos?.firstname}</Text>
                            <Text>{t("PROFIL_LASTNAME")}: {infos?.lastname}</Text>
                            <Text>{t("PROFIL_YEAR")}: Tek {infos?.studentyear}</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.sameLine, { alignItems: "flex-start", justifyContent: "space-around", marginTop: 20 }]}>
                    <View style={[styles.box, { width: "48%", height: 150, padding: 12, marginTop: 0 }]}>
                        <View style={[styles.betColumn, { height: "100%" }]}>
                            <Text>{t("PROFIL_CREDIT")}: {infos?.credits}</Text>
                            <Text>G.P.A: {infos?.gpa}</Text>
                        </View>
                    </View>
                    <View style={[styles.box, { width: "48%", height: 150, padding: 12, marginTop: 0 }]}>
                        <View style={[styles.betColumn, { height: "100%" }]}>
                            <Text>{t("PROFIL_SEMETER")}: {infos?.semester}</Text>
                            <Text>{t("PROFIL_PROMO")}: {infos?.promo}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.box}>
                    <View style={[styles.sameLine]}>
                        <View style={{ width: "48%", alignItems: "center" }}>
                            <RNPickerSelect
                                placeholder={{ inputLabel: "Date", label: "Date" }}
                                onValueChange={(value) => console.log(value)}
                                items={marksDate}
                                value={selectedDate}
                            />
                        </View>
                        <View>
                            <RNPickerSelect
                                placeholder={{ inputLabel: "Date", label: "Date" }}
                                onValueChange={(value) => console.log(value)}
                                items={marksModules}
                                value={selectedModule}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
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
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sameLine: {
        display: "flex",
        flexDirection: "row",

    },
    betColumn: {
        marginLeft: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: 'flex-start',
        justifyContent: "space-around",
    },
    box: {
        padding: 20,
        margin: 15,
        alignSelf: "center",
        width: "98%",
        backgroundColor: "white",
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

export default ProfilPage;
