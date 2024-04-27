import { View, Text } from "react-native";
import React from "react";
import { Touchable } from "react-native";
import { TouchableOpacity } from "react-native";

const Employee = ({onPress}: {onPress: () => void}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="flex-row gap-3 p-3">
        <View className="rounded-md bg-[#4361c4] w-14 h-14 items-center justify-center">
          <Text className="text-white text-2xl">H</Text>
        </View>
        <View>
          <Text className="font-bold text-xl">Hamza Rbib</Text>
          <Text className="text-gray-500">Software Engineer (12345)</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Employee;
