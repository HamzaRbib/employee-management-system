import { View, Text } from "react-native";
import { Foundation } from '@expo/vector-icons';
import React from "react";

const Calendar = ({date}: {date: Date}) => {
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
  return (
    <View className="flex-row p-2 w-40 items-center bg-slate-200 rounded-lg justify-center">
      <View className="bg-white h-10 w-10 mr-2 rounded-lg items-center justify-center">
        <Foundation name="calendar" size={35} color="black" />
      </View>
      <Text className="font-bold">{month} {year}</Text>
    </View>
  );
};

export default Calendar;
