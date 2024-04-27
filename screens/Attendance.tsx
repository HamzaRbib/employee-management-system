import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import DateSwitcher from "../components/DateSwitcher";
import Employee from "../components/Employee";

const Attendance = () => {
  const navigation: NavigationProp<any, any> = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Attendance",
      headerTitleAlign: "center",
    });
  });
  return (
    <View>
      <DateSwitcher />
      <View className="mt-12">
        <Employee onPress={() => {}} />
        <Text className="text-lg mx-3">Basic Pay : 30000</Text>
      </View>
      <View>
        <Text>Attendance</Text>
      </View>
    </View>
  );
};

export default Attendance;
