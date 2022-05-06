import React, { useEffect, useRef, useState } from 'react';
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
import { t } from 'i18next';
import { useScrollToTop } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { DateTime } from 'luxon';

interface DropMenuType {
    list: Array<any>,
    title: String,
    onClick: (infos: any) => void
}

const { userInfo } = RootStore.getInstance();

const DropDownActi: React.FC<DropMenuType> = ({ list, title, onClick }) => {

    const [isOpen, setOpen] = useState(true)

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
                <ScrollView
                    style={{ maxHeight: 400 }}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.containerDrop}>
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
                                    {t("EMPTY_ACTI")}
                                </Text>
                            </View>
                        }
                    </View>
                </ScrollView>
            }
        </View>
    )
}

const DropDownProject: React.FC<DropMenuType> = ({ list, title, onClick }) => {

    const [isOpen, setOpen] = useState(true);

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
                <ScrollView
                    style={{ maxHeight: 400 }}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.containerDrop}>
                        {list.length > 0 ?
                            list.map(element => {
                                console.log(element);
                                return (
                                <TouchableOpacity key={element.title + element.text} style={styles.boxElem} onPress={() => onClick(element)} >
                                    <Text style={{ marginBottom: 10 }}><Text style={{ fontSize: 15, fontWeight: "bold" }}>Title: </Text>{element.title}</Text>
                                    <Progress.Bar progress={element.timeline_barre / 100} width={200} />
                                </TouchableOpacity>
                            )})
                            :
                            <View style={styles.boxElem} >
                                <Text>
                                    {t("EMPTY_PROJ")}
                                </Text>
                            </View>
                        }
                    </View>
                </ScrollView>
            }
        </View>
    )
}

const DropDownNotes: React.FC<DropMenuType> = ({ list, title, onClick }) => {

    const [isOpen, setOpen] = useState(true);

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
                <ScrollView
                    style={{ maxHeight: 400 }}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.containerDrop}>
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
                                    {t("EMPTY_NOTE")}
                                </Text>
                            </View>
                        }
                    </View>
                </ScrollView>
            }
        </View>
    )
}

const DropDownHisto: React.FC<DropMenuType> = ({ list, title, onClick }) => {

    const [isOpen, setOpen] = useState(true);

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
                <ScrollView
                    style={{ maxHeight: 400 }}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.containerDrop}>
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
                                    {t("EMPTY_HISTO")}
                                </Text>
                            </View>
                        }
                    </View>
                </ScrollView>
            }
        </View>
    )
}

const HomePage = ({ navigation }: any) => {
    const scrollRef: any = useRef();
    useScrollToTop(scrollRef);
    const queries = new Query();
    const { t } = useTranslation();
    const [isLoading, setLoading] = useState(false);
    const [acti, setActi] = useState([]);
    const [project, setProject] = useState([]);
    const [notes, setNotes] = useState([]);
    const [history, setHistory] = useState([]);
    const [isRefreshingBooking, setRefreshBooking] = useState<boolean>(false);
    const [isGoToTop, setGoTo] = useState<boolean>(false);

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

    const scrollHandler = (event: any) => {
        setGoTo(event.nativeEvent.contentOffset.y > 50)
    }

    const goToTop = () => {
        scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
        });
    }

    useEffect(() => {
        getInfos();
    }, [])

    return (
        <SafeAreaView style={{ backgroundColor: "#1C9FF0", width: '100%', height: '100%', flex: 1 }} >
            <ScrollView
                scrollEnabled={true}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshingBooking}
                        onRefresh={() => {
                            getInfos().finally(() => setRefreshBooking(false))
                        }}
                    />
                }
                ref={scrollRef}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
            >
                <View>
                    <DropDownActi list={acti} title={t("ACTI")} onClick={(infos) => navigation.navigate("ActiResume", { infos })} />
                    <DropDownProject list={project} title={t("PROJ")} onClick={(infos) => navigation.navigate("ProjectResume", { infos })} />
                    <DropDownNotes list={notes} title={t("NOTE")} onClick={(infos) => navigation.navigate("MarkResume", { infos })} />
                    <DropDownHisto list={history} title={t("HISTO")} onClick={() => { }} />
                </View>
            </ScrollView>
            {(isGoToTop && userInfo.goToTop) &&
                <TouchableOpacity onPress={() => goToTop()} style={{ position: "absolute", right: 30, bottom: 20, backgroundColor: "#1C9FF0", borderRadius: 50, padding: 10 }} >
                    <AntDesign name="arrowup" size={24} color="white" />
                </TouchableOpacity>
            }
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
        </SafeAreaView >
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
        width: "97%",
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
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10
    },
    spaceBet: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        borderColor: "black",
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 10,
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

export default observer(HomePage);
