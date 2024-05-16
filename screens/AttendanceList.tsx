import { View, Text, Pressable, FlatList } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Employee from "../components/Employee";
import Calendar from "../components/Calendar";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import EmployeeType from "../types/Employee";
import AttendanceType from "../server/types/Attendance";

const AttendanceList = ({
  route,
}: {
  route: { params: { employee: EmployeeType } };
}) => {
  const navigation: NavigationProp<any, any> = useNavigation();
  const { employee } = route.params;
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [attendanceList, setAttendanceList] = useState<Array<AttendanceType>>(
    []
  );

  useEffect(() => {
    fetch("http://10.0.2.2:5000/getMarkedAttendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employeeId: employee.employeeId,
        date: date,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAttendanceList(data);
      })
      .catch((error) => console.error(error));
  }, [date]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Attendance List",
      headerTitleAlign: "center",
      headerLeft: () => (
        <Pressable
          onPress={() => {
            navigation.goBack();
            navigation.navigate("AttendanceReport");
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
      ),
    });
  }, []);

  function getTodayPayment(status: string) {
    if (status === "present" || status === "holiday") {
      return employee.salary / 24;
    } else if (status === "halfDay") {
      return employee.salary / 48;
    }
    return 0;
  }
  return (
    <View className="flex-1">
      <Employee employee={employee} onPress={() => {}} />
      <Pressable className="items-center" onPress={() => setOpen(true)}>
        <Calendar date={date} />
      </Pressable>
      <View>
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
      </View>
      <FlatList
        className="my-2"
        data={attendanceList}
        renderItem={({ item }) => (
          <AttendanceCard
            date={new Date(item.date)}
            status={item.status}
            payment={getTodayPayment(item.status).toFixed(2)}
          />
        )}
      />
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
      return "#3eaf79";
    } else if (status === "absent") {
      return "#fc6461";
    } else if (status === "halfDay") {
      return "#f4ae69";
    }
    return "#21b1ca";
  }
  return (
    <View className="flex-row items-center justify-between p-2 bg-slate-300 rounded-lg m-2">
      <View>
        <Text className="text-slate-500">{date.toLocaleDateString()}</Text>
        <Text className="font-bold text-lg" style={{ color: getStatusColor() }}>
          {status.toUpperCase()}
        </Text>
      </View>
      <Text className="font-bold text-lg">{payment}</Text>
    </View>
  );
};
