import { View, Text, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from 'expo-font';
import { FontAwesome5 } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const ManageEmployee = () => {
  
  const navigation: NavigationProp<any, any> = useNavigation();
  return (
    <View className="flex-row mx-2 mt-8">
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

const Card = ({
  title,
  icon,
  onPress,
}: {
  title: string;
  icon: JSX.Element;
  onPress: () => void;
}) => {
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('../../assets/fonts/Inter-Black.otf'),
  });
  return (
    <Pressable onPress={onPress} className="w-1/2 p-1">
      <View className="bg-white h-20 w-20 rounded-full items-center justify-center mb-2 absolute z-10 left-1/3 -top-5" style={{ elevation: 12, shadowColor: "#52006A" }}>
        {icon}
      </View>
      <View className="items-center p-2 bg-zinc-300 rounded-3xl mt-3 h-28 justify-center" style={{ elevation: 12, shadowColor: "#52006A" }}>
        <Text className="mt-3 text-slate-800" style={{ fontFamily: 'Inter-Black', fontSize: 17 }}>{title}</Text>
      </View>
    </Pressable>
  );
};
