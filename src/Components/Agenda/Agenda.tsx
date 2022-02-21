import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, SafeAreaView, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, Modal, Linking, ActivityIndicator, Dimensions } from 'react-native';
import Query from '../../Graphql/Query';
import RootStore from '../../store/rootStore';
import EventCalendar from 'react-native-events-calendar';
import addDays from 'date-fns/addDays';

const { userInfo } = RootStore.getInstance();

let { width } = Dimensions.get('window')

const events = [
    { start: '2022-02-17 14:30:00', end: '2022-02-17 15:30:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
]

const AgendaPage = () => {
    const queries = new Query();
    const { t, i18n } = useTranslation();
    const [dateSelected, setDateSelected] = useState<string>(new Date().toISOString().split('T')[0])
    const [isLoading, setLoading] = useState<boolean>(true);
    const [acti, setActi] = useState([])

    const getDayEvent = async () => {
        try {
            const data = await queries.getPlanning(userInfo.getToken());
            const event = data?.data?.GetPlanning;
            // console.log("event => ", event);
            const newEvent = event.map(element => {
                return ({
                    start: element.start,
                    end: element.end,
                    title: element?.titlemodule + " >> " + element?.acti_title,
                    summary: element.salle
                })
            })
            setActi(newEvent);
        } catch (err) {
            console.log("graphQL error => ", err, JSON.stringify(err, null, 2));
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // console.log("update");
        // getDayEvent();
    }, [])

    return (
        <SafeAreaView style={{ width: '100%', height: '100%', flex: 1 }} >
                <EventCalendar
                    events={events}
                    width={width}
                    format24h={true}
                    start={8}
                    end={22}
                    initDate={dateSelected}
                    onDateChanged
                    dateChanged={(date: string) => console.warn(date)}
                    scrollToFirst={true}
                    style={ {
                        container: {
                            backgroundColor: 'white'
                        }, 
                        event: {
                            opacity: 0.01
                        }
                    }}
                />
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
