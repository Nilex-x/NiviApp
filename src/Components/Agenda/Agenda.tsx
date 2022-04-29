import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Modal, ActivityIndicator } from 'react-native';
import { DateTime } from 'luxon';
import { Planning } from '../../Graphql/types';
import { Entypo } from '@expo/vector-icons';
import Query from '../../Graphql/Query';
import RootStore from '../../store/rootStore';

const { userInfo } = RootStore.getInstance();

const AgendaPage = () => {
    const queries = new Query();
    const { t, i18n } = useTranslation();
    const [dateSelected, setDateSelected] = useState<string>(DateTime.now().toISODate().toString())
    const [isLoading, setLoading] = useState<boolean>(true);
    const [Events, setEvents] = useState<Array<any>>([]);

    const getColor = (title: string) => {
        if (title == "other")
            return "#0078C2"
        if (title == "exam")
            return "#E97039"
        if (title == "rdv")
            return "#DB9934"
        if (title == "tp")
            return "#9258C8"
        if (title == "class")
            return "#0091EB"
    }

    const getEvent = (planning: Array<Planning>, date: String) => { // [titlemodule] >> [acti_title] [salle] ([total_students_registered]/[nb_seat])
        const data = planning.filter(element => DateTime.fromSQL(element.end).diff(DateTime.fromISO(date)).as("hours") > 0 && DateTime.fromSQL(element.start).diff(DateTime.fromISO(date)).as("hours") < 1 && (element.module_available && element.module_registered));
        const new_data = data.map(element => ({
            title: element.titlemodule + " >> " + element.acti_title + " " + element.salle + " (" + element.total_students_registered + "/" + element.nb_seat + ")",
            start_hour: DateTime.fromSQL(element.start).hour,
            start_minute: DateTime.fromSQL(element.start).minute,
            end_hour: DateTime.fromSQL(element.end).hour,
            end_minute: DateTime.fromSQL(element.end).minute,
            codeModule: element.codemodule,
            scolaryear: element.scolaryear,
            codeinstance: element.codeinstance,
            codeActi: element.codeacti,
            color: getColor(element.type_code)
        }));
        return new_data;
    }

    const getPlanning = async () => {
        setLoading(true)
        try {
            const event = []
            const data = await queries.getDayEvent(userInfo.getToken(), DateTime.fromISO(dateSelected).toFormat("yyyy-LL-dd"), userInfo.country, userInfo.city)
            const planning = data.data.GetDayEvent;
            for (let i = 8; i <= 23; i++) {
                const date = DateTime.fromISO(dateSelected).set({ hour: i }).toISO()
                event.push({
                    hour: DateTime.fromISO(dateSelected).set({ hour: i }).toISO(),
                    event: getEvent(planning, date)
                })
            }
            setEvents(event)
        } catch (err) {
            console.log("graphQL error", JSON.stringify(err, null, 2))
        } finally {
            setLoading(false)
        }
    }

    const DisplayEvents = ({ event }) => {
        const pourcentWidth = 99 / event.length;

        return (
            <View style={{ width: "82%", display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                {event.map((element, index) => {
                    const pourcentHeigth = element.end_minute == 0 ? 98 : 100 / (60 / element.end_minute);
                    return (
                        <View key={index} style={{ margin: 2, backgroundColor: element.color, width: `${pourcentWidth}%`, height: `${pourcentHeigth}%`, alignItems: "center" }}>
                            <Text style={{ color: "white", width: "85%" }}>{element.title}</Text>
                        </View>
                    )
                })}
            </View>
        )
    }

    useEffect(() => {
        getPlanning()
    }, [dateSelected])

    return (
        <SafeAreaView style={{ width: '100%', height: '100%', flex: 1, backgroundColor: "#EAEAEA" }}>
            <View style={{ padding: 8, marginBottom: 3, borderBottomRightRadius: 100, borderBottomLeftRadius: 100, display: "flex", flexDirection: "row", justifyContent: "space-around", backgroundColor: "white" }}>
                <Entypo name="arrow-with-circle-left" size={30} color="#FF6100" />
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Text>{DateTime.fromISO(dateSelected).setLocale(i18n.language).toFormat("cccc dd LLLL yyyy")}</Text>
                </View>
                <Entypo name="arrow-with-circle-right" size={30} color="#FF6100" onPress={() => setDateSelected(DateTime.fromISO(dateSelected).plus({ days: 1 }).toISO())} />
            </View>
            <ScrollView>
                <View style={{ display: "flex", width: "100%" }}>
                    {Events.map((element, index) => (
                        <View key={element.title + element.hour + index} style={{ flexDirection: "row", height: 200, borderTopWidth: 1, borderBottomWidth: (index + 1 == Events.length) ? 1 : 0 }}>
                            <View style={{ width: "15%", alignItems: "center", borderRightWidth: 1 }}>
                                <Text style={{ fontSize: 20 }}>{DateTime.fromISO(element.hour).hour} h</Text>
                            </View>
                            <DisplayEvents event={element.event} />
                        </View>
                    ))}
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
        justifyContent: "space-between",
        borderColor: "black",
        borderBottomWidth: 0.5,
        marginLeft: 30,
        marginRight: 30,
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

export default AgendaPage;
