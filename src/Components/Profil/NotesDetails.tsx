import { keys } from 'mobx';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, SafeAreaView, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, Modal, Linking, ActivityIndicator, RefreshControl } from 'react-native';
import Query from '../../Graphql/Query';
import RootStore from '../../store/rootStore';
import RNPickerSelect from 'react-native-picker-select';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ModuleMarks } from '../../Graphql/types';

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

const NotesDetails = (props) => {
    const queries = new Query();
    const { t, i18n } = useTranslation();
    const [noteSelected, setNotesSelected] = useState(null)
    const [isLoading, setLoading] = useState(false);
    const infos = props.route.params.infos;
    const notes = props.route.params.notes;

    return (
        <SafeAreaView style={{ backgroundColor: "#1C9FF0", width: '100%', height: '100%', flex: 1 }} >
            <ScrollView>
                <View style={styles.box}>
                    <Text style={styles.titleInfo}>{infos.title}</Text>
                    <Text style={styles.titleInfo}>{t("PROFIL_CREDIT")}: {infos.credits}</Text>
                </View>
                <View style={styles.box}>
                    {notes.length > 0 ?
                        <View style={{ width: "100%" }}>
                            <Text style={styles.titleInfo}>{t("PROFIL_DETAIL_ALL_MARKS")}</Text>
                            {notes.map((note, index) => (
                                <TouchableOpacity key={index} style={[styles.MarksStyle, { backgroundColor: (noteSelected && index == noteSelected.index) ? "#D4CDCA" : "white", display: "flex", flexDirection: "row", width: "100%" }]} onPress={() => setNotesSelected({ ...note, index })}>
                                    <Text style={{ maxWidth: "80%" }}>{note.title}</Text>
                                    <Text>{t("PROFIL_DETAIL_VALUE")}: {note.final_note}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        :
                        <View>
                            <Text style={{ fontSize: 15, alignSelf: "center" }}>{t("PROFIL_DETAIL_EMPTY")}</Text>
                        </View>
                    }
                </View>
                <View style={styles.box}>
                    <Text style={[styles.titleInfo, { marginBottom: 10 }]}>{t("PROFIL_DETAIL_MARK")}</Text>
                    {noteSelected ?
                        <View>
                            <Text style={{ fontSize: 15 }}><Text style={{ fontWeight: "bold" }}>{t("PROFIL_DETAIL_ACTI")}:</Text> {noteSelected.title}</Text>
                            <Text style={{ fontSize: 15 }}><Text style={{ fontWeight: "bold" }}>{t("PROFIL_DETAIL_VALUE")}:</Text> {noteSelected.final_note}</Text>
                            <Text style={{ fontSize: 15 }}><Text style={{ fontWeight: "bold" }}>{t("PROFIL_DETAIL_COMMENT")}:</Text>{"\n"}{noteSelected.comment}</Text>
                        </View>
                        :
                        <Text style={{ fontSize: 15, alignSelf: "center" }}>{t("PROFIL_DETAIL_EMPTY_SELECT")}</Text>
                    }
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

export default NotesDetails;
