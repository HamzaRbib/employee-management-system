import { View } from "react-native";
import React, { useLayoutEffect } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Employee from "../components/Employee";
import { ScrollView } from "react-native";
import { FAB } from "react-native-paper";

const EmployeeList = () => {
  const navigation: NavigationProp<any, any> = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        onChangeText: (event: { nativeEvent: { text: any } }) =>
          console.log(event.nativeEvent.text),
      },
      headerTitle: "Employee List",
      headerTitleAlign: "center",
    });
  }, []);

  return (
    <View className="flex-1">
      <FAB
        icon="plus"
        className="absolute bottom-5 right-5 z-10"
        onPress={() => navigation.navigate("AddEmployee")}
      />
      <ScrollView>
        <Employee onPress={() => {}} />
      </ScrollView>
    </View>
  );
};

export default EmployeeList;
