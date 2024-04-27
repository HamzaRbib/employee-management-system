import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons, Feather, FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";

const MoreEmployeeInfo = () => {
  return (
    <View className="flex-row justify-between px-3">
      <View>
        <Card
          title="Attendence Criteria"
          icon={<MaterialIcons name="rule" size={26} color="black" />}
          color={"#f97316"}
        />
        <Card
          title="Increesed Workflow"
          icon={<Feather name="bar-chart" size={26} color="black" />}
          color={"#10b981"}
        />
      </View>
      <View>
        <Card
          title="Cost Savings"
          icon={<FontAwesome6 name="money-check-dollar" size={26} color="black" />}
          color={"#60a5fa"}
        />
        <Card
          title="Employee Performance"
          icon={<MaterialCommunityIcons name="speedometer" size={26} color="black" />}
          color={"#c084fc"}
        />
      </View>
    </View>
  );
};

export default MoreEmployeeInfo;

const Card = ({ title, icon, color }: { title: string; icon: JSX.Element, color: string }) => {
  return (
    <TouchableOpacity>
      <View className="items-center w-[180px] p-3 rounded-lg mt-3" style={{ backgroundColor: color }}>
        <View className="bg-white h-12 w-12 rounded-xl items-center justify-center mb-2">
          {icon}
        </View>
        <Text className="font-bold text-md">{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
