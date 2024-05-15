import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from "@react-navigation/native";

const ManageEmployee = () => {
  const navigation: NavigationProp<any, any> = useNavigation();
  return (
    <View className="flex-row justify-between mx-3">
      <Card
        title="Employee List"
        icon={<Ionicons name="people" size={24} color="black" />}
        onPress={() => navigation.navigate("EmployeeList")}
      />
      <Card
        title="Mark Attendance"
        icon={<FontAwesome5 name="fist-raised" size={24} color="black" />}
        onPress={() => navigation.navigate("MarkAttendance")}
      />
    </View>
  );
};

export default ManageEmployee;

const Card = ({ title, icon, onPress }: { title: string; icon: JSX.Element, onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className=" items-center w-44 p-2 bg-gray-300 rounded-lg mt-3">
        <View className="bg-white h-16 w-16 rounded-full items-center justify-center mb-2">
          {icon}
        </View>
        <Text className="font-bold text-md">{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
