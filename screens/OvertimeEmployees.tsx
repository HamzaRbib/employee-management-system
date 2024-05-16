import { View, Text } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FAB } from "react-native-paper";
import Calendar from "../components/Calendar";
import Employee from "../components/Employee";

const OvertimeEmployees = () => {
  const navigation: NavigationProp<any, any> = useNavigation();
  const [dateFrom, setDateFrom] = useState<Date>(new Date());
  const [dateTo, setDateTo] = useState<Date>(new Date());

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Overtime Employees",
      headerTitleAlign: "center",
    });
  }, []);
  return (
    <View className="flex-1">
      <View className="flex-row mt-2">
        <View className="flex-1 items-center">
          <Text className="font-bold">From</Text>
          <Calendar date={dateFrom} />
        </View>
        <View className="flex-1 items-center">
          <Text className="font-bold">To</Text>
          <Calendar date={dateTo} />
        </View>
      </View>
      <FAB
        icon="clock"
        className="absolute bottom-16 right-2"
        label="Add Overtime"
        onPress={() => console.log("Pressed")}
      />
      <View className="flex-row bg-blue-800 absolute bottom-0 ">
        <View className="flex-1 m-1 justify-center">
          <Text className="text-white text-lg font-bold">Total</Text>
          <Text className="text-white">Total Entries : 0</Text>
        </View>
        <View className="flex-1 m-2 items-end justify-center">
          <Text className="text-white">Hours : 0.00</Text>
          <Text className="text-white">Wages : 0</Text>
        </View>
      </View>
    </View>
  );
};

export default OvertimeEmployees;
