import { View, Text, Pressable } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Employee from "../components/Employee";
import Calendar from "../components/Calendar";
import DateTimePicker from "@react-native-community/datetimepicker";

const AttendanceList = () => {
  const navigation: NavigationProp<any, any> = useNavigation();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Attendance List",
      headerTitleAlign: "center",
    });
  });
  return (
    <View>
      <Employee onPress={() => {}} />
      <Pressable className="items-center" onPress={() => setOpen(true)}>
        <Calendar date={date} />
      </Pressable>
      {open && (
        <DateTimePicker
          testID="dateTimePicker"
          display="spinner"
          mode="date"
          value={date}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date;
            setOpen(false);
            setDate(currentDate);
          }}
        />
      )}
      <AttendanceCard date={date} status="absent" payment="500" />
    </View>
  );
};

export default AttendanceList;

const AttendanceCard = ({
  date,
  status,
  payment,
}: {
  date: Date;
  status: string;
  payment: string;
}) => {
  function getStatusColor(): string {
    if (status === "present") {
      return "#7cdf64";
    } else if (status === "absent") {
      return "#e71d36";
    } else if (status === "halfday") {
      return "#e9d758";
    }
    return "#e9d758";
  }
  return (
    <View className="flex-row items-center justify-between p-2 bg-slate-300 rounded-lg m-2">
      <View>
        <Text className="text-slate-500">{date.toLocaleDateString()}</Text>
        <Text
          className="font-bold text-lg"
          style={{ color: getStatusColor() }}
        >
          {status.toUpperCase()}
        </Text>
      </View>
      <Text className="font-bold text-lg">{payment}</Text>
    </View>
  );
};
