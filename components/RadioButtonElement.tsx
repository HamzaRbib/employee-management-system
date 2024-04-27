import { View, Text } from "react-native";
import React from "react";
import { RadioButton } from "react-native-paper";

const RadioButtonElement = ({value, description}: {value: string, description: string}) => {
  return (
    <View className="flex-row rounded-lg items-center w-44 py-2 px-2 m-2 bg-[#bddbe1]">
      <RadioButton value={value} />
      <Text className="text-lg">{description}</Text>
    </View>
  );
};

export default RadioButtonElement;
