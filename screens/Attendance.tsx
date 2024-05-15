import { View, Text, Pressable } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import DateSwitcher from "../components/DateSwitcher";
import Employee from "../components/Employee";
import { RadioButton, TextInput } from "react-native-paper";
import RadioButtonElement from "../components/RadioButtonElement";
import { Button } from "react-native-elements";
import EmployeeType from "../types/Employee";
import { Ionicons } from "@expo/vector-icons";

const Attendance = ({route}: {route: {params: {employee: EmployeeType}}}) => {
  const navigation: NavigationProp<any, any> = useNavigation();
  const {employee} = route.params;
  const [date, setDate] = useState<Date>(new Date());
  const [status, setStatus] = useState<string>("present");
  const [advance, setAdvance] = useState<string>("");
  const [bonus, setBonus] = useState<string>("");

  const statusColor = () => {
    if (status === "present") {
      return "#3eaf79";
    } else if (status === "absent") {
      return "#fc6461";
    }else if (status === "halfDay") {
      return "#f4ae69";
    }
    return "#21b1ca";
  }

  const submitAttendance = () => {
    fetch("http://10.0.2.2:5000/markAttendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employeeId: employee.employeeId,
        date: date,
        status: status,
        advance: advance.length > 0 ? advance : "0",
        bonus: bonus.length > 0 ? bonus : "0",
      }),
    })
    .then((response) => {
      navigation.goBack();
      navigation.navigate("MarkAttendance");
    })
    .catch((error) => console.error(error));
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Attendance",
      headerTitleAlign: "center",
      headerLeft: () => (
        <Pressable
          onPress={() => {
            navigation.goBack();
            navigation.navigate("MarkAttendance");
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
      ),
    });
  });
  function getTodayPayment() {
    if (status === "present" || status === "holiday") {
      return employee.salary / 24;
    }else if (status === "halfDay") {
      return employee.salary / 48;
    }
    return 0;
  }

  return (
    <View>
      <DateSwitcher date={date} setDate={setDate} />
      <View className="mt-12">
        <Employee employee={employee} onPress={() => {}} />
        <View style={{backgroundColor: statusColor()}} className="w-10 h-10 rounded-md items-center justify-center absolute right-5 top-4">
          <Text className="text-white text-xl">{status[0].toUpperCase()}</Text>
        </View>
        <Text className="text-lg mx-3">Basic Pay : {employee.salary}</Text>
      </View>
      <View>
        <Text className="text-lg mx-3 mt-3 font-bold italic tracking-widest">
          Attendance
        </Text>
        <RadioButton.Group
          onValueChange={(newValue) => setStatus(newValue)}
          value={status}
        >
          <View className="flex-row justify-evenly">
            <View>
              <RadioButtonElement value="present" description="Present" />
              <RadioButtonElement value="absent" description="Absent" />
            </View>
            <View>
              <RadioButtonElement value="halfDay" description="Half Day" />
              <RadioButtonElement value="holiday" description="Holiday" />
            </View>
          </View>
        </RadioButton.Group>
      </View>
      <View className="flex-row justify-evenly mx-4 my-2">
        <TextInput
        className="w-1/2 mr-2"
          mode="outlined"
          placeholder=""
          label={"Advance/Loan"}
          value={advance}
          keyboardType="numeric"
          onChange={(text) => {
            setAdvance(text.nativeEvent.text);
          }}
        />
        <TextInput
        className="w-1/2 ml-2"
          mode="outlined"
          placeholder=""
          label={"Extra bonus"}
          value={bonus}
          keyboardType="numeric"
          onChange={(text) => {
            setBonus(text.nativeEvent.text);
          }}
        />
      </View>
      <View className="m-2">
        <Text className="text-lg font-bold text-stone-400">Today Payment : {getTodayPayment().toFixed(2)}</Text>
      </View>
      <Button title="Submit" buttonStyle={{ backgroundColor: "#4361c4", margin: 10, padding: 12 }} onPress={() => submitAttendance()} />
    </View>
  );
};

export default Attendance;
