import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useTranslation } from "react-i18next";
import AgendaPage from "./Agenda";


type AgendaParamList = {
    Agenda: undefined;
};

const Stack = createNativeStackNavigator<AgendaParamList>();

export interface BookingStackProps { }

const AgendaStack: React.FC<BookingStackProps> = () => {
  const { t, i18n } = useTranslation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Agenda"
        component={AgendaPage}
        options={{
          title: t("HEADER_AGENDA"),
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

export default AgendaStack;
