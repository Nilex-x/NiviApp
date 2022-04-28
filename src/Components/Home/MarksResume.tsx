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
import Button from '../Utils/Button';
import Mutate from '../../Graphql/Mutation';

const { userInfo } = RootStore.getInstance();

const MarksResumePage = (props) => {
    const queries = new Query();
    const mutate = new Mutate();
    const { t } = useTranslation();
    const [isLoading, setLoading] = useState(false);
    const [isRefreshingBooking, setRefreshBooking] = useState<boolean>(false);
    const [detail, setDetails] = useState({
        events: [],
        description: "",
    });
    const [modalConfig, setModalConfig] = useState({
        isVisible: false,
        text: ""
    })

    const infos = props.route.params.infos;


    return (
        <SafeAreaView style={{ backgroundColor: "#1C9FF0", width: '100%', height: '100%', flex: 1 }} >
            {!isLoading &&
                <ScrollView
                    // refreshControl={
                    //     <RefreshControl
                    //         refreshing={isRefreshingBooking}
                    //         onRefresh={() => {
                    //             getDetail().finally(() => setRefreshBooking(false))
                    //         }}
                    //     />
                    // }
                >
                    <View style={{ margin: 10 }}>
                        <Text>Notes</Text>
                    </View>
                </ScrollView>
            }
            <Modal
                visible={isLoading || modalConfig.isVisible}
                transparent={true}
            >
                <View style={styles.centeredView}>
                    <View>
                        {isLoading &&
                            <View style={[styles.modalView, { width: '10%' }]}>
                                <ActivityIndicator
                                    color="#1C9FF0"
                                />
                            </View>
                        }
                        {modalConfig.isVisible &&
                            <View style={[styles.modalView, { width: '100%' }]}>
                                <Text style={{ fontSize: 20, fontWeight: "bold", alignSelf: "center", marginBottom: 10 }} >{modalConfig.text}</Text>
                                <Button title={t("BACK")} onClick={() => setModalConfig({ isVisible: false, text: "" })} styleButton={{ minWidth: '70%' }} />
                            </View>
                        }
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
    subTitleInfo: {
        fontSize: 16,
    },
    containerDrop: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        marginLeft: 10,
        marginRight: 10,
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

export default MarksResumePage;
