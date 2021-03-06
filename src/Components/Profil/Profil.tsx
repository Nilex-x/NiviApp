import { keys } from 'mobx';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, SafeAreaView, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, Modal, Linking, ActivityIndicator, RefreshControl, ImageBackground } from 'react-native';
import Query from '../../Graphql/Query';
import RootStore from '../../store/rootStore';
import RNPickerSelect from 'react-native-picker-select';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ModuleMarks } from '../../Graphql/types';
import Pie from 'react-native-progress/Pie';

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

const StatusIcon = ({ status }: any) => {
    if (status == "-") {
        return <AntDesign name="question" size={24} color="#1C9FF0" />
    } else if (status == "Acquis") {
        return <MaterialIcons name="done" size={24} color="#14E724" />
    } else if (status == "Echec") {
        return <AntDesign name="close" size={24} color="red" />
    } else if (status == "D") {
        return <Text style={{ fontSize: 20, color: "#5FD305", marginRight: 5 }}>{status}</Text>
    } else if (status == "C") {
        return <Text style={{ fontSize: 20, color: "#5FD305", marginRight: 5 }}>{status}</Text>
    } else if (status == "B") {
        return <Text style={{ fontSize: 20, color: "#5FD305", marginRight: 5 }}>{status}</Text>
    } else if (status == "A") {
        return <Text style={{ fontSize: 20, color: "#5FD305", marginRight: 5 }}>{status}</Text>
    }
}

const ProfilPage = ({ navigation }: any) => {
    const queries = new Query();
    const { t, i18n } = useTranslation();
    const [infos, setInfos] = useState<infosUser | any>();
    const [isRefreshingBooking, setRefreshBooking] = useState<boolean>(false);
    const [semester, setSemester] = useState<any>([])
    const [selectSemester, setSelectedSemester] = useState()
    const [marksValue, setMarkValue] = useState<ModuleMarks | null>(null)
    const [isLoading, setLoading] = useState(true);

    const getInfo = async () => {
        setLoading(true);
        try {
            const data = await queries.getUserInfo(userInfo.getToken());
            const dataMarks = await queries.getMarksDate(userInfo.getToken());
            const infos = data?.data?.GetUserInfo;
            const ModulesMark: Array<any> | any = dataMarks?.data?.GetMarks
            setInfos(infos);
            setSemester(ModulesMark.map(element => ({ label: element.semester, value: element })))
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
                <View style={[styles.sameLine, styles.box, { alignItems: "flex-start", justifyContent: "space-around", marginTop: 20 }]}>
                    <View style={{ width: "35%", height: 150, padding: 10 }}>
                        <Text style={{ fontSize: 15, marginBottom: 35 }}>{t("PROFIL_CREDIT")}: {infos?.credits}</Text>
                        <Text style={{ fontSize: 15, marginBottom: 35 }}>G.P.A: {infos?.gpa}</Text>
                        <Text style={{ fontSize: 15, marginBottom: 35 }}>{t("PROFIL_SEMETER")}: {infos?.semester}</Text>
                        <Text style={{ fontSize: 15, marginBottom: 35 }}>{t("PROFIL_PROMO")}: {infos?.promo}</Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ marginBottom: 10, fontSize: 20, maxWidth: "70%" }}>{t("PROFIL_TIME_AVERAGE")}</Text>
                        <Pie progress={infos?.averageLogTime} size={150} unfilledColor="#878787" color="#15E800" borderWidth={0} />
                    </View>
                </View>
                <View style={styles.box}>
                    <Text style={[styles.titleInfo, { marginBottom: 10, textDecorationLine: "underline" }]}>{t("PROFIL_MARKS")}</Text>
                    <View style={[styles.sameLine]}>
                        <View style={{ width: "100%", borderWidth: 1, padding: 10, backgroundColor: "#F1F1F1", borderRadius: 10, }}>
                            <RNPickerSelect
                                placeholder={{ inputLabel: t("PROFIL_SEMETER"), label: t("PROFIL_SEMETER"), value: null }}
                                onValueChange={(value) => setMarkValue(value)}
                                items={semester}
                                style={{ placeholder: styles.selectStyleText, inputIOS: styles.selectStyleText, inputAndroid: styles.selectStyleText }}
                                value={selectSemester}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 10, width: "100%" }}>
                        {marksValue ?
                            <View>
                                {marksValue.modules.map(element => (
                                    <TouchableOpacity key={element?.title + element?.codeinstance} style={styles.MarksStyle} onPress={(infos) => { navigation.navigate("NotesDetail", { infos: element, notes: marksValue.notes.filter(v1 => v1?.codeinstance == element?.codeinstance && v1?.codemodule == element?.codemodule) }) }}>
                                        <Text style={{ maxWidth: "70%" }}>{element?.title}</Text>
                                        <StatusIcon status={element?.grade} />
                                    </TouchableOpacity>
                                ))}
                            </View>
                            :
                            <View style={{ width: "100%" }}>
                                <Text style={{ alignSelf: "center", fontSize: 17 }}>{t("PROFIL_EMPTY_SEMESTER")}</Text>
                            </View>
                        }
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
    },
    MarksStyle: {
        width: "100%",
        marginTop: 10,
        padding: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "black",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    selectStyleText: {
        color: "black",
        fontSize: 15,
        alignSelf: "center"
    }
});

export default ProfilPage;
