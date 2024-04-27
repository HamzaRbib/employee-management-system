import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import DateSwitcher from "../components/DateSwitcher";
import Employee from "../components/Employee";

const MarkAttendance = () => {
  const navigation: NavigationProp<any, any> = useNavigation();
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        onChangeText: (event: { nativeEvent: { text: any } }) =>
          console.log(event.nativeEvent.text),
      },
      title: "Mark Attendance",
      headerTitleAlign: "center",
    });
  });
  return (
    <View>
      <DateSwitcher />
      <ScrollView className="mt-12" showsVerticalScrollIndicator={false} >
        <Employee onPress={() => navigation.navigate("Attendance")} />
      </ScrollView>
    </View>
  );
};

export default MarkAttendance;
