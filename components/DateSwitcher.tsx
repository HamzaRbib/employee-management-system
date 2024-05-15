import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

const DateSwitcher = ({date, setDate}: {date: Date, setDate: React.Dispatch<React.SetStateAction<Date>>}) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <View className="flex-row items-center justify-center p-2 absolute top-0 w-full bg-white z-10">
      <Pressable onPress={() => setDate(new Date(date.getTime() - 86400000))}>
        <MaterialIcons name="chevron-left" size={30} color="black" />
      </Pressable>
      <Pressable className="mx-3" onPress={() => setOpen(true)}>
        <Text className="">{date.toDateString()}</Text>
      </Pressable>
      <Pressable onPress={() => setDate(new Date(date.getTime() + 86400000))}>
        <MaterialIcons name="chevron-right" size={30} color="black" />
      </Pressable>
      {open && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date;
            setOpen(false);
            setDate(currentDate);
          }}
        />
      )}
    </View>
  );
};

export default DateSwitcher;
