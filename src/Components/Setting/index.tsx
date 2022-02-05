import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useTranslation } from "react-i18next";
import SettingPage from "./Setting";

type HomeParamList = {
    Setting: undefined;
};

const Stack = createNativeStackNavigator<HomeParamList>();

export interface BookingStackProps { }

const SettingStack: React.FC<BookingStackProps> = () => {
  const { t, i18n } = useTranslation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Setting"
        component={SettingPage}
        options={{
          title: t("HEADER_SETTING"),
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

export default SettingStack;
