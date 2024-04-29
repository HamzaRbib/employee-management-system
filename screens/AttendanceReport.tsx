import { Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Employee from "../components/Employee";

const AttendanceReport = () => {
  const navigation: NavigationProp<any, any> = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Employee List",
      headerTitleAlign: "center",
      headerSearchBarOptions: {
        onChangeText: (event: { nativeEvent: { text: any } }) =>
          console.log(event.nativeEvent.text),
      },
    });
  });
  return (
    <View>
      <Employee onPress={() => {navigation.navigate("AttendanceList")}} />
    </View>
  );
};

export default AttendanceReport;
