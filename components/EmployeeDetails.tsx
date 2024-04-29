import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";


const EmployeeDetails = () => {
  const navigation: NavigationProp<any, any> = useNavigation();
  return (
    <View className="bg-gray-200 p-2 rounded-lg mx-3 mt-4">
      <Card
        title={"Attendance Report"}
        icon={<Entypo name="news" size={26} color="black" />}
        onPress={() => navigation.navigate("AttendanceReport")}
      />
      <Card
        title={"Summary Report"}
        icon={<MaterialCommunityIcons name="book-arrow-right" size={26} color="black" />}
        onPress={() => navigation.navigate("SummaryReport")}
      />
      <Card
        title={"All Generate Reports"}
        icon={<MaterialIcons name="my-library-books" size={26} color="black" />}
        onPress={() => navigation.navigate("AllGenerateReports")}
      />
      <Card
        title={"Overtime Employees"}
        icon={<MaterialIcons name="payments" size={26} color="black" />}
        onPress={() => navigation.navigate("OvertimeEmployees")}
      />
    </View>
  );
};

export default EmployeeDetails;

const Card = ({ title, icon, onPress }: { title: string; icon: JSX.Element, onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="flex-row items-center justify-between bg-[#b587be] rounded-lg m-2">
        <View className="flex-row items-center p-2">
          <View className="bg-white h-12 w-12 rounded-lg items-center justify-center">
            {icon}
          </View>
          <Text className="font-bold text-lg ml-4">{title}</Text>
        </View>
        <View className="bg-white h-9 w-9 mr-2 rounded-lg items-center justify-center justify-self-end">
          <Entypo name="chevron-right" size={24} color="black" />
        </View>
      </View>
    </TouchableOpacity>
  );
};
