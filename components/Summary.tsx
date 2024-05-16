import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Employee from "./Employee";
import { DataTable } from "react-native-paper";
import EmployeeType from "../types/Employee";
import AttendanceType from "../server/types/Attendance";

const Summary = ({
  employee,
  date,
}: {
  employee: EmployeeType;
  date: Date;
}) => {
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

  const totalAttendances = () => {
    const present = attendanceList.filter(
      (attendance) => attendance.status === "present"
    ).length;
    const absent = attendanceList.filter(
      (attendance) => attendance.status === "absent"
    ).length;
    const halfDay = attendanceList.filter(
      (attendance) => attendance.status === "halfDay"
    ).length;
    const holiday = attendanceList.filter(
      (attendance) => attendance.status === "holiday"
    ).length;

    return [present, absent, halfDay, holiday];
  };

  const totalSalary = () => {
    const [present, absent, halfDay, holiday] = totalAttendances();
    return (
      (Number(employee.salary) / 24) * present +
      (Number(employee.salary) / 48) * halfDay +
      Number(employee.salary / 24) * holiday +
      totalBonus() -
      totalDebt()
    );
  };

  const totalBonus = () => {
    return attendanceList.reduce(
      (total, current) => total + Number(current.bonus),
      0
    );
  };

  const totalDebt = () => {
    return attendanceList.reduce(
      (total, current) => total + Number(current.advance),
      0
    );
  };

  return (
    <View
      className="bg-white m-2"
      style={{ elevation: 10, shadowColor: "#52006A" }}
    >
      <Employee employee={employee} onPress={() => null} />
      <DataTable>
        <DataTable.Row>
          <DataTable.Cell
            className="bg-[#3eaf79]"
            textStyle={{
              width: "100%",
              textAlign: "center",
              color: "white",
              fontSize: 15,
            }}
          >
            P
          </DataTable.Cell>
          <DataTable.Cell
            className="bg-[#fc6461]"
            textStyle={{
              width: "100%",
              textAlign: "center",
              color: "white",
              fontSize: 15,
            }}
          >
            A
          </DataTable.Cell>
          <DataTable.Cell
            className="bg-[#f4ae69]"
            textStyle={{
              width: "100%",
              textAlign: "center",
              color: "white",
              fontSize: 15,
            }}
          >
            H-D
          </DataTable.Cell>
          <DataTable.Cell
            className="bg-[#21b1ca]"
            textStyle={{
              width: "100%",
              textAlign: "center",
              color: "white",
              fontSize: 15,
            }}
          >
            H
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell
            textStyle={{
              width: "100%",
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {totalAttendances()[0]}
          </DataTable.Cell>
          <DataTable.Cell
            textStyle={{
              width: "100%",
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {totalAttendances()[1]}
          </DataTable.Cell>
          <DataTable.Cell
            textStyle={{
              width: "100%",
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {totalAttendances()[2]}
          </DataTable.Cell>
          <DataTable.Cell
            textStyle={{
              width: "100%",
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {totalAttendances()[3]}
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>
      <View className="flex-row justify-between">
        <View className="flex-1 mx-2 my-1">
          <View className="flex-row justify-between">
            <Text>Debet : </Text>
            <Text className="font-bold">$ {totalDebt()}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text>Bonus : </Text>
            <Text className="font-bold">$ {totalBonus()}</Text>
          </View>
        </View>
        <View className="flex-1 mx-2 my-1">
          <View className="flex-row justify-between">
            <Text>OT Hours : </Text>
            <Text className="font-bold">0.00</Text>
          </View>
          <View className="flex-row justify-between">
            <Text>OT Wages : </Text>
            <Text className="font-bold">$ 0</Text>
          </View>
        </View>
      </View>
      <View className="items-end mx-2">
        <Text className="text-lg font-bold text-blue-400">
          Total : $ {totalSalary()}
        </Text>
      </View>
    </View>
  );
};

export default Summary;
