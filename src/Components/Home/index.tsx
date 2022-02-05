import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useTranslation } from "react-i18next";
import Home from "./Home";

type HomeParamList = {
    Home: undefined;
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
