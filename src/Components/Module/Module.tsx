import { keys } from 'mobx';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, SafeAreaView, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, Modal, Linking, ActivityIndicator, RefreshControl } from 'react-native';
import Query from '../../Graphql/Query';
import RootStore from '../../store/rootStore';
import AntDesign from '@expo/vector-icons/AntDesign';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

interface DropMenuType {
    list: Array<any>,
    title: String,
    onClick: (infos: any) => void
}

interface StatusIconType {
    status: String
}

const { userInfo } = RootStore.getInstance();

const StatusIcon = ({ status }: StatusIconType) => {
    if (status == "notregistered") {
        return <SimpleLineIcons name="user-follow" size={24} color="black" />
    } else if (status == "ongoing") {
        return <SimpleLineIcons name="user-following" size={24} color="#1C9FF0"/>
    } else if (status == "fail") {
        return <AntDesign name="close" size={24} color="red" />
    } else if (status == "valid") {
        return <AntDesign name="check" size={24} color="green" />
    } else {
        return <SimpleLineIcons name="user-unfollow" size={24} color="black" />
    }
}

const DropDownModule: React.FC<DropMenuType> = ({ list, title, onClick }) => {

    const [isOpen, setOpen] = useState(false)

    return (
        <View style={styles.box}>
            <TouchableOpacity
                onPress={() => setOpen(!isOpen)}
            >
                <View style={styles.spaceBet}>
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
                            list.map((element, index) =>
                                <TouchableOpacity key={element.title + element.credits + element.begin + index} style={styles.boxElem} onPress={() => onClick(element)} >
                                    <Text>{element.title}</Text>
                                    <StatusIcon status={element.status}/>
                                </TouchableOpacity>
                            )
                            :
                            <View style={styles.boxElem} >
                                <Text>
                                    Aucun module
                                </Text>
                            </View>
                        }
                    </ScrollView>
                </View>
            }
        </View>
    )
}

const ModulePage = ({ navigation }: any) => {
    const queries = new Query();
    const { t, i18n } = useTranslation();
    const [isLoading, setLoading] = useState(false);
    const [modules, setModules] = useState<any>([]);
    const [isRefreshingBooking, setRefreshBooking] = useState<boolean>(false);

    const getModules = async () => {
        setLoading(true);
        try {
            const data = await queries.getModules(userInfo.getToken());
            const modules = data?.data?.GetModules;
            const newArray: any = []
            newArray.push(modules.filter((element, index) => element.semester == modules[0].semester))
            newArray.push(modules.filter((element, index) => element.semester != 0 && element.semester != modules[modules.length - 1].semester))
            newArray.push(modules.filter((element, index) => element.semester != 0 && element.semester != modules[modules.length / 2].semester))
            setModules(newArray);
        } catch (err) {
            console.log("GraphQL error", err, JSON.stringify(err, null, 2));
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getModules();
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
                <View style={{ width: "100%" }}>
                    {modules.length > 0 &&
                        <View style={{ width: "100%" }}>
                            <DropDownModule list={modules[0]} title={"semestre " + modules[0][0].semester} onClick={(infos) => { navigation.navigate("ModuleDetail", { infos })}} />
                            <DropDownModule list={modules[1]} title={"semestre " + modules[1][0].semester} onClick={(infos) => { navigation.navigate("ModuleDetail", { infos })}} />
                            <DropDownModule list={modules[2]} title={"semestre " + modules[2][0].semester} onClick={(infos) => { navigation.navigate("ModuleDetail", { infos })}} />
                        </View>
                    }
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
        width: "98%",
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
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10
    },
    spaceBet: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        borderColor: "black",
        marginLeft: 20,
        marginRight: 20,
        width: "98%"
    },
    boxElem: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
        alignSelf: "center",
        width: "100%",
        marginTop: 10,
        backgroundColor: "white",
        alignItems: "flex-start",
        borderRadius: 10,
        borderWidth: 0.8,
        borderColor: "#1C9FF0"
    },
});

export default ModulePage;
