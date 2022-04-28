import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useTranslation } from "react-i18next";
import ActiResumePage from "./ActiResume";
import Home from "./Home";
import MarksResumePage from "./MarksResume";
import ProjectResumePage from "./ProjectResume";

type HomeParamList = {
    Home: undefined;
    ActiResume: undefined;
    ProjectResume: undefined;
    MarkResume: undefined;
};

const Stack = createNativeStackNavigator<HomeParamList>();

export interface BookingStackProps { }

const HomeStack: React.FC<BookingStackProps> = () => {
  const { t, i18n } = useTranslation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: t("HEADER_HOME"),
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#1C9FF0",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="ActiResume"
        component={ActiResumePage}
        options={{
          title: t("HEADER_HOME_ACTI"),
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#1C9FF0",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="ProjectResume"
        component={ProjectResumePage}
        options={{
          title: t("HEADER_HOME_PROJ"),
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#1C9FF0",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="MarkResume"
        component={MarksResumePage}
        options={{
          title: t("HEADER_HOME_PROJ"),
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#1C9FF0",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      {/* <Stack.Screen
        name="details"
        component={Details}
        options={{
          title: t("HEADER_DETAIL"),
          headerStyle: {
            backgroundColor: "#D71D9A",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default HomeStack;
