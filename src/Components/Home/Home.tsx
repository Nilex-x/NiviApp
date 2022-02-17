import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, Modal, ActivityIndicator } from 'react-native';
import Query from '../../Graphql/Query';
import RootStore from '../../store/rootStore';
import * as Progress from 'react-native-progress';
import AntDesign from '@expo/vector-icons/AntDesign';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Foundation from '@expo/vector-icons/Foundation';
import format from 'date-fns/format';

interface DropMenuType {
    list: Array<any>,
    title: String,
    onClick: (infos: any) => void
}

const { userInfo } = RootStore.getInstance();

const DropDownActi: React.FC<DropMenuType> = ({ list, title, onClick }) => {

    const [isOpen, setOpen] = useState(false)

    console.log("list =>", list)

    return (
        <View style={styles.box}>
            <TouchableOpacity
                onPress={() => setOpen(!isOpen)}
            >
                <View style={styles.spaceBet}>
                    <Octicons name="project" size={27} color="#1C9FF0" />
                    <View style={styles.container}>
                        <Text style={[styles.textButton, { color: "black" }]}>{title}</Text>
                    </View>
                    {!isOpen ?
                        <AntDesign name="down" size={27} color="#1C9FF0" />
                        :
                        <AntDesign name="up" size={27} color="#1C9FF0" onPress={() => setOpen(false)} />
                    }
                </View>
            </TouchableOpacity>
            {isOpen &&
                <View style={styles.containerDrop}>
                    <ScrollView
                        style={{ maxHeight: 400 }}
                        nestedScrollEnabled={true}
                        showsVerticalScrollIndicator={false}
                    >
                        {list.length > 0 ?
                            list.map(element =>
                                <TouchableOpacity key={element.title + element.salle + element.code_acti + element.timeline_end} style={styles.boxElem} onPress={() => onClick(element)} >
                                    <Text style={{ marginBottom: 10 }}><Text style={{ fontSize: 15, fontWeight: "bold" }}>Title: </Text>{element.title}</Text>
                                    <Text style={{ marginBottom: 10 }}><Text style={{ fontSize: 15, fontWeight: "bold" }}>Salle: </Text>{element.salle ? element.salle : "Non définie"}</Text>
                                    <Text style={{ marginBottom: 10 }} ><Text style={{ fontSize: 15, fontWeight: "bold" }}>De: </Text>{format(new Date(element.timeline_start), "dd/MM/yyyy - HH:mm")}</Text>
                                    <Text><Text style={{ fontSize: 15, fontWeight: "bold" }}>A: </Text>{format(new Date(element.timeline_end), "dd/MM/yyyy - HH:mm")}</Text>
                                </TouchableOpacity>
                            )
                            :
                            <View style={styles.boxElem} >
                                <Text>
                                    Aucun activités
                                </Text>
                            </View>
                        }
                    </ScrollView>
                </View>
            }
        </View>
    )
}

const DropDownProject: React.FC<DropMenuType> = ({ list, title, onClick }) => {

    const [isOpen, setOpen] = useState(false);

    return (
        <View style={styles.box}>
            <TouchableOpacity
                onPress={() => setOpen(!isOpen)}
            >
                <View style={styles.spaceBet}>
                    <AntDesign name="profile" size={27} color="#1C9FF0" style={{ marginRight: 7 }} />
                    <View style={styles.container}>
                        <Text style={[styles.textButton, { color: "black" }]}>{title}</Text>
                    </View>
                    {!isOpen ?
                        <AntDesign name="down" size={27} color="#1C9FF0" />
                        :
                        <AntDesign name="up" size={27} color="#1C9FF0" onPress={() => setOpen(false)} />
                    }
                </View>
            </TouchableOpacity>
            {isOpen &&
                <View style={styles.containerDrop}>
                    <ScrollView
                        style={{ maxHeight: 400 }}
                        nestedScrollEnabled={true}
                        showsVerticalScrollIndicator={false}
                    >
                        {list.length > 0 ?
                            list.map(element =>
                                <TouchableOpacity key={element.title + element.text} style={styles.boxElem} onPress={() => onClick(element)} >
                                    <Text style={{ marginBottom: 10 }}><Text style={{ fontSize: 15, fontWeight: "bold" }}>Title: </Text>{element.title}</Text>
                                    <Progress.Bar progress={0.3} width={200} />
                                </TouchableOpacity>
                            )
                            :
                            <View style={styles.boxElem} >
                                <Text>
                                    Aucun projets
                                </Text>
                            </View>
                        }
                    </ScrollView>
                </View>
            }
        </View>
    )
}

const DropDownNotes: React.FC<DropMenuType> = ({ list, title, onClick }) => {

    const [isOpen, setOpen] = useState(false);

    return (
        <View style={styles.box}>
            <TouchableOpacity
                onPress={() => setOpen(!isOpen)}
            >
                <View style={styles.spaceBet}>
                    <Foundation name="results" size={27} color="#1C9FF0" style={{ marginRight: 7 }} />
                    <View style={styles.container}>
                        <Text style={[styles.textButton, { color: "black" }]}>{title}</Text>
                    </View>
                    {!isOpen ?
                        <AntDesign name="down" size={27} color="#1C9FF0" />
                        :
                        <AntDesign name="up" size={27} color="#1C9FF0" onPress={() => setOpen(false)} />
                    }
                </View>
            </TouchableOpacity>
            {isOpen &&
                <View style={styles.containerDrop}>
                    <ScrollView
                        style={{ maxHeight: 400 }}
                        nestedScrollEnabled={true}
                        showsVerticalScrollIndicator={false}
                    >
                        {list.length > 0 ?
                            list.map(element =>
                                <TouchableOpacity key={element.title + element.text} style={styles.boxElem} onPress={onClick} >
                                    <Text style={{ marginBottom: 10 }}><Text style={{ fontSize: 15, fontWeight: "bold" }}>Title: </Text>{element.title}</Text>
                                    <Text style={{ marginBottom: 10 }}><Text style={{ fontSize: 15, fontWeight: "bold" }}>note: </Text>{element.note}</Text>
                                    <Text style={{ marginBottom: 10 }}><Text style={{ fontSize: 15, fontWeight: "bold" }}>noteur: </Text>{element.noteur}</Text>
                                </TouchableOpacity>
                            )
                            :
                            <View style={styles.boxElem} >
                                <Text>
                                    Aucunes notes
                                </Text>
                            </View>
                        }
                    </ScrollView>
                </View>
            }
        </View>
    )
}

const DropDownHisto: React.FC<DropMenuType> = ({ list, title, onClick }) => {

    const [isOpen, setOpen] = useState(false);

    return (
        <View style={styles.box}>
            <TouchableOpacity
                onPress={() => setOpen(!isOpen)}
            >
                <View style={styles.spaceBet}>
                    <MaterialIcons name="history" size={27} color="#1C9FF0" style={{ marginRight: 7 }} />
                    <View style={styles.container}>
                        <Text style={[styles.textButton, { color: "black" }]}>{title}</Text>
                    </View>
                    {!isOpen ?
                        <AntDesign name="down" size={27} color="#1C9FF0" />
                        :
                        <AntDesign name="up" size={27} color="#1C9FF0" onPress={() => setOpen(false)} />
                    }
                </View>
            </TouchableOpacity>
            {isOpen &&
                <View style={styles.containerDrop}>
                    <ScrollView
                        style={{ maxHeight: 420 }}
                        nestedScrollEnabled={true}
                        showsVerticalScrollIndicator={false}
                    >
                        {list.length > 0 ?
                            list.map(element => {
                                let title: String = element.title
                                if (element.title.includes("<a")) {
                                    title = element.title.substring(0, element.title.indexOf("<a")) + element.title.substring(element.title.indexOf(">") + 1);
                                    title = title.substring(0, title.indexOf("</a>"))
                                }
                                return (
                                    <TouchableOpacity key={element.title + element.note} style={styles.boxElem} onPress={onClick} >
                                        <Text style={{ marginBottom: 10 }}><Text style={{ fontSize: 15, fontWeight: "bold" }}>Title: </Text>{title}</Text>
                                    </TouchableOpacity>
                                )
                            })
                            :
                            <View style={styles.boxElem} >
                                <Text>
                                    Aucunes notes
                                </Text>
                            </View>
                        }
                    </ScrollView>
                </View>
            }
        </View>
    )
}

const HomePage = ({ navigation }: any) => {
    const queries = new Query();
    const { t } = useTranslation();
    const [isLoading, setLoading] = useState(false);
    const [acti, setActi] = useState([]);
    const [project, setProject] = useState([]);
    const [notes, setNotes] = useState([]);
    const [history, setHistory] = useState([]);
    const [isRefreshingBooking, setRefreshBooking] = useState<boolean>(false);

    const getInfos = async () => {
        setLoading(true);
        try {
            const data = await queries.getBoard(userInfo.getToken())
            const infos: any = data?.data?.GetBoard;
            setActi(infos.activites);
            setProject(infos.projets);
            setNotes(infos.notes);
            setHistory(infos.historys);
        } catch (err) {
            console.log("error graphQl => ", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getInfos();
        console.log(new Date().toISOString())
    }, [])

    return (
        <SafeAreaView style={{ backgroundColor: "#1C9FF0", width: '100%', height: '100%', flex: 1 }} >
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshingBooking}
                        onRefresh={() => {
                            getInfos().finally(() => setRefreshBooking(false))
                        }}
                    />
                }
                showsVerticalScrollIndicator={false}
            >
                <View style={{ margin: 10 }}>
                    <DropDownActi list={acti} title={t("ACTI")} onClick={(infos) => navigation.navigate("ActiResume", { infos })} />
                    <DropDownProject list={project} title={t("PROJ")} onClick={(infos) => navigation.navigate("ProjectResume", { infos })} />
                    <DropDownNotes list={notes} title={t("NOTE")} onClick={() => alert("click")} />
                    <DropDownHisto list={history} title={t("HISTO")} onClick={() => alert("click")} />
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
        marginTop: 10,
        backgroundColor: "white",
        alignItems: "flex-start",
        borderRadius: 10,
        borderWidth: 0.8,
        borderColor: "#1C9FF0"
    }
});

export default HomePage;
