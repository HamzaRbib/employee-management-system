import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import EmployeeType from "../server/types/Employee";

const Employee = ({employee, onPress}: {employee: EmployeeType, onPress: () => void}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="flex-row gap-3 p-3">
        <View className="rounded-md bg-[#4361c4] w-14 h-14 items-center justify-center">
          <Text className="text-white text-2xl">{employee.employeeName[0].toUpperCase()}</Text>
        </View>
        <View>
          <Text className="font-bold text-xl">{employee.employeeName}</Text>
          <Text className="text-gray-500">{employee.designation + " (" + employee.employeeId + ")"}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Employee;
