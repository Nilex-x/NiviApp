import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useTranslation } from "react-i18next";
import ModulePage from "./Module";
import ModuleDetailPage from "./ModuleDetails";

type HomeParamList = {
    Module: undefined;
    ModuleDetail: undefined;
};

const Stack = createNativeStackNavigator<HomeParamList>();

export interface BookingStackProps { }

const ModuleStack: React.FC<BookingStackProps> = () => {
  const { t, i18n } = useTranslation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Module"
        component={ModulePage}
        options={{
          title: t("HEADER_MODULE"),
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
        name="ModuleDetail"
        component={ModuleDetailPage}
        options={{
          title: t("HEADER_MODULE"),
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#1C9FF0",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default ModuleStack;
