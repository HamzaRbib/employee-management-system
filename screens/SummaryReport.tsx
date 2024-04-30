import { View, Text, Pressable } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Calendar from "../components/Calendar";
import DateTimePicker from "@react-native-community/datetimepicker";
import Summary from "../components/Summary";

const SummaryReport = () => {
  const navigation: NavigationProp<any, any> = useNavigation();
  const [date, setDate] = useState<Date>(new Date());
  const [open, setOpen] = useState<boolean>(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View className="h-32 items-center justify-end">
          <Text className="text-xl font-bold m-3.5">Summary Report</Text>
          <Pressable
            className="m-2"
            onPress={() => {
              setOpen(true);
            }}
          >
            <Calendar date={date} />
          </Pressable>
        </View>
      ),
      headerTitleAlign: "center",
      headerSearchBarOptions: {
        onchangeText: (event: { nativeEvent: { text: any } }) =>
          console.log(event.nativeEvent.text),
        placeholder: "Search Employee",
      },
    });
  });
  return (
    <View>
      {open && (
        <DateTimePicker
          mode="date"
          value={date}
          display="spinner"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date;
            setOpen(false);
            setDate(currentDate);
          }}
        />
      )}
      <Summary />
    </View>
  );
};

export default SummaryReport;
