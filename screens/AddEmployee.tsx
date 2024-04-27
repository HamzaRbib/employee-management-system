import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import AnimatedTextInput from "react-native-animated-placeholder-textinput";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, Switch } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";

const AddEmployee = () => {
  const navigation: NavigationProp<any, any> = useNavigation();
  const [countryCode, setCountryCode] = useState<CountryCode>("US");
  const [country, setCountry] = useState<Country>();
  const [fullName, setFullName] = useState<string>("");
  const [employeeId, setEmployeeId] = useState<string>("");
  const [designation, setDesignation] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [open, setOpen] = useState<boolean>(false); // open and close date picker
  const [joiningDate, setJoiningDate] = useState<Date>(new Date());
  const [employeeSalary, setEmployeeSalary] = useState<number>(0);
  const [activeEmployee, setActiveEmployee] = useState<boolean>(false);

  console.log(country);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Add Employee",
    });
  }, []);
  return (
    <ScrollView>
      <Text className="text-xl font-bold mx-2 mt-2">Select Country :</Text>
      <View className="border border-gray-500 p-2 rounded-md m-2">
        <CountryPicker
          withFlag={true}
          countryCode={countryCode}
          withFilter={true}
          withCountryNameButton={true}
          withAlphaFilter={true}
          onSelect={(country) => {
            setCountryCode(country.cca2);
            setCountry(country);
          }}
          theme={{ fontSize: 20 }}
        />
      </View>
      <View className="m-2">
        <Text className="text-xl font-bold mb-1.5">Full Name :</Text>
        <AnimatedTextInput
          placeholder="Enter full name"
          value={fullName}
          textInputProps={{}}
          onChangeText={(text) => {
            setFullName(text);
          }}
        />
      </View>
      <View className="m-2">
        <Text className="text-xl font-bold mb-1.5">Employee ID :</Text>
        <AnimatedTextInput
          placeholder="Enter employee ID"
          value={employeeId}
          textInputProps={{}}
          onChangeText={(text) => {
            setEmployeeId(text);
          }}
        />
      </View>
      <View className="m-2">
        <Text className="text-xl font-bold mb-1.5">Designation :</Text>
        <AnimatedTextInput
          placeholder="Enter designation"
          value={designation}
          textInputProps={{}}
          onChangeText={(text) => {
            setDesignation(text);
          }}
        />
      </View>
      <View className="m-2">
        <Text className="text-xl font-bold mb-1.5">Mobile Number :</Text>
        <AnimatedTextInput
          placeholder="Enter mobile number"
          value={mobileNumber}
          textInputProps={{
            keyboardType: "number-pad",
          }}
          onChangeText={(text) => {
            setMobileNumber(text);
          }}
        />
      </View>
      <View className="m-2">
        <Text className="text-xl font-bold mb-1.5">Date of Birth :</Text>
        <Pressable
          className="border p-3 rounded-md"
          onPress={() => setOpen(true)}
        >
          <Text>{date.toLocaleDateString()}</Text>
        </Pressable>
        {open && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={"date"}
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || date;
              setOpen(false);
              setDate(currentDate);
            }}
          />
        )}
      </View>
      <View className="m-2">
        <Text className="text-xl font-bold mb-1.5">Joining Date :</Text>
        <Pressable
          className="border p-3 rounded-md"
          onPress={() => setOpen(true)}
        >
          <Text>{joiningDate.toLocaleDateString()}</Text>
        </Pressable>
        {open && (
          <DateTimePicker
            testID="dateTimePicker"
            value={joiningDate}
            mode={"date"}
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || joiningDate;
              setOpen(false);
              setJoiningDate(currentDate);
            }}
          />
        )}
      </View>
      <View className="m-2">
        <Text className="text-xl font-bold mb-1.5">Employee Salary :</Text>
        <AnimatedTextInput
          placeholder="Enter employee salary"
          value={employeeSalary.toString()}
          textInputProps={{
            keyboardType: "number-pad",
          }}
          onChangeText={(text) => {
            setEmployeeSalary(Number(text));
          }}
        />
      </View>
      <View className="m-2">
        <Text className="text-xl font-bold mb-1.5">Active Employee :</Text>
        <View className="flex-row justify-between items-center">
          <Text
            className="text-lg"
            style={{ color: activeEmployee ? "green" : "red" }}
          >
            {activeEmployee ? "Active" : "Inactive"}
          </Text>
          <Switch
            value={activeEmployee}
            onValueChange={(value) => setActiveEmployee(value)}
          />
        </View>
      </View>
      <Button
        title="Save"
        buttonStyle={{
          backgroundColor: "rgba(111, 202, 186, 1)",
          padding: 18,
          margin: 5,
        }}
        titleStyle={{ fontSize: 20 }}
        onPress={() => {}}
      />
      <Button
        title="Cancel"
        buttonStyle={{ backgroundColor: "#94a3b8", padding: 18, margin: 5 }}
        titleStyle={{ fontSize: 20 }}
        onPress={() => {navigation.navigate("EmployeeList")}}
      />
    </ScrollView>
  );
};

export default AddEmployee;
