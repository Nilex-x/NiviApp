import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useTranslation } from "react-i18next";import NotesDetails from "./NotesDetails";
import ProfilPage from "./Profil";
;

type ProfilParamList = {
    Profil: undefined;
    NotesDetail: undefined;
};

const Stack = createNativeStackNavigator<ProfilParamList>();

export interface BookingStackProps { }

const ProfilStack: React.FC<BookingStackProps> = () => {
  const { t, i18n } = useTranslation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profil"
        component={ProfilPage}
        options={{
          title: t("HEADER_PROFIL"),
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
        name="NotesDetail"
        component={NotesDetails}
        options={{
          title: t("HEADER_PROFIL_MARKS"),
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

export default ProfilStack;
