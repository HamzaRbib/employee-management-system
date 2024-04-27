import { View, Text, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Employee from "../components/Employee";
import { ScrollView } from "react-native";

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
      <TouchableOpacity
        className="absolute bottom-5 right-5 z-10"
        onPress={() => navigation.navigate("AddEmployee")}
      >
        <Ionicons name="add-circle" size={70} color="#4361c4" />
      </TouchableOpacity>
      <ScrollView>
        <Employee />
        <Employee />
        <Employee />
        <Employee />
        <Employee />
        <Employee />
        <Employee />
        <Employee />
        <Employee />
        <Employee />
        <Employee />
      </ScrollView>
    </View>
  );
};

export default EmployeeList;
