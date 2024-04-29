import { View, Text } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import DateSwitcher from "../components/DateSwitcher";
import Employee from "../components/Employee";
import { RadioButton, TextInput } from "react-native-paper";
import RadioButtonElement from "../components/RadioButtonElement";
import { Button } from "react-native-elements";

const Attendance = () => {
  const navigation: NavigationProp<any, any> = useNavigation();
  const [value, setValue] = useState<string>("present");
  const [advance, setAdvance] = useState<string>("");
  const [bonus, setBonus] = useState<string>("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Attendance",
      headerTitleAlign: "center",
    });
  });
  return (
    <View>
      <DateSwitcher />
      <View className="mt-12">
        <Employee onPress={() => {}} />
        <Text className="text-lg mx-3">Basic Pay : 30000</Text>
      </View>
      <View>
        <Text className="text-lg mx-3 mt-3 font-bold italic tracking-widest">
          Attendance
        </Text>
        <RadioButton.Group
          onValueChange={(newValue) => setValue(newValue)}
          value={value}
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
          placeholder="Enter value"
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
          placeholder="Enter value"
          label={"Extra bonus"}
          value={bonus}
          keyboardType="numeric"
          onChange={(text) => {
            setBonus(text.nativeEvent.text);
          }}
        />
      </View>
      <Button title="Submit" buttonStyle={{ backgroundColor: "#4361c4", margin: 10, padding: 12 }} onPress={() => {}} />
    </View>
  );
};

export default Attendance;
