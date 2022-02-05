import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { useTranslation } from "react-i18next";
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import HomeStack from "../Components/Home";
import SettingStack from "../Components/Setting";
import ModuleStack from "../Components/Module";
import AgendaStack from "../Components/Agenda/Index";
import ProfilStack from "../Components/Profil/Index";

type TabsParamList = {
    HomeStack: undefined;
    SettingStack: undefined;
    ModuleStack: undefined;
    AgendaStack: undefined;
    ProfilStack: undefined;
};

const Tab = createBottomTabNavigator<TabsParamList>();

function Tabs() {
    const { t, i18n } = useTranslation();

    return (
        <Tab.Navigator
            initialRouteName="HomeStack"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarInactiveTintColor: "#000",
                tabBarActiveTintColor: "#1C9FF0",
                tabBarIcon: ({ color }) => {
                    let icon = <></>;
                    if (route.name === "HomeStack") {
                        icon = <Feather name="home" size={25} color={color} />
                    } else if (route.name == "SettingStack") {
                        icon = <Feather name="settings" size={25} color={color} />
                    } else if (route.name == "ModuleStack") {
                        icon = <AntDesign name="profile" size={25} color={color} />
                    } else if (route.name == "AgendaStack") {
                        icon = <Feather name="calendar" size={25} color={color} />
                    } else if (route.name == "ProfilStack") {
                        icon = <MaterialCommunityIcons name="face-profile" size={25} color={color} />
                    }
                    return icon;
                },
            })}
        >
            <Tab.Screen
                name="AgendaStack"
                component={AgendaStack}
                options={{
                    tabBarLabel: t("HEADER_AGENDA"),
                }}
            />
            <Tab.Screen
                name="ModuleStack"
                component={ModuleStack}
                options={{
                    tabBarLabel: t("HEADER_MODULE"),
                }}
            />
            <Tab.Screen
                name="HomeStack"
                component={HomeStack}
                options={{
                    tabBarLabel: t("HEADER_HOME"),
                }}
            />
            <Tab.Screen
                name="ProfilStack"
                component={ProfilStack}
                options={{
                    tabBarLabel: t("HEADER_PROFIL"),
                }}
            />
            <Tab.Screen
                name="SettingStack"
                component={SettingStack}
                options={{
                    tabBarLabel: t("HEADER_SETTING"),
                }}
            />
        </Tab.Navigator>
    );
}

export default Tabs;
