import { View, Text, Pressable, FlatList } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Calendar from "../components/Calendar";
import DateTimePicker from "@react-native-community/datetimepicker";
import Summary from "../components/Summary";
import EmployeeType from "../types/Employee";

const SummaryReport = () => {
  const navigation: NavigationProp<any, any> = useNavigation();
  const [employees, setEmployees] = useState<Array<EmployeeType>>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [open, setOpen] = useState<boolean>(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        onChangeText: (event: { nativeEvent: { text: any } }) => {
          setEmployees(
            employees.filter((employee) =>
              employee.employeeName
                .toLowerCase()
                .includes(event.nativeEvent.text.toLowerCase())
            )
          );
        },
        placeholder: "Search Employee",
      },
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
    });
  }, [date]);

  useEffect(() => {
    fetch("http://10.0.2.2:5000/getAllEmployees")
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <View className="flex-1">
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
      <FlatList
        data={employees}
        extraData={date}
        renderItem={({ item }) => <Summary employee={item} date={date} />}
      />
    </View>
  );
};

export default SummaryReport;
