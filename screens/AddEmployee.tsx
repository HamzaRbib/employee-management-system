import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import AnimatedTextInput from "react-native-animated-placeholder-textinput";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, Switch } from "react-native-elements";
import EmployeeType from "../types/Employee";

const AddEmployee = ({
  route,
}: {
  route: { params: { employees: Array<EmployeeType> } };
}) => {
  const { employees } = route.params;
  const navigation: NavigationProp<any, any> = useNavigation();
  const [countryCode, setCountryCode] = useState<CountryCode>("US");
  const [countryName, setCountryName] = useState<string>("United States");
  const [country, setCountry] = useState<Country>();
  const [fullName, setFullName] = useState<string>("");
  const [employeeId, setEmployeeId] = useState<string>("");
  const [designation, setDesignation] = useState<string>("");
  const [phoneNumber, setMobileNumber] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [dateOpen, setDateOpen] = useState<boolean>(false); // open and close date picker
  const [joiningDateOpen, setJoiningDateOpen] = useState<boolean>(false);
  const [joiningDate, setJoiningDate] = useState<Date>(new Date());
  const [employeeSalary, setEmployeeSalary] = useState<string>("0");
  const [activeEmployee, setActiveEmployee] = useState<boolean>(false);

  useEffect(() => {
    if (country) {
      setCountryCode(country!.cca2);
      setCountryName(country!.name as string);
    }
  }, [country]);

  const saveData = () => {
    if (fullName && employeeId && designation && phoneNumber) {
      if (
        employees.find((employee) => employee.employeeId === employeeId) !==
        undefined
      ) {
        alert("Employee ID already exists");
        return;
      }
      fetch("http://10.0.2.2:5000/addEmployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country: {
            countryCode,
            countryName,
          },
          employeeName: fullName,
          employeeId,
          designation,
          phoneNumber,
          dateOfBirth: date,
          joiningDate,
          salary: employeeSalary,
          isActive: activeEmployee,
        }),
      })
        .then((response) => {
          console.log(response);
          navigation.goBack();
          navigation.navigate("EmployeeList");
        })
        .catch((error) => {
          console.error(error);
        });
      return;
    }
    alert("Please fill all the fields");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Add Employee",
      headerTitleAlign: "center",
      headerLeft: () => <></>,
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
          value={phoneNumber}
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
          onPress={() => setDateOpen(true)}
        >
          <Text>{date.toLocaleDateString()}</Text>
        </Pressable>
        {dateOpen && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={"date"}
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || date;
              setDateOpen(false);
              setDate(currentDate);
            }}
          />
        )}
      </View>
      <View className="m-2">
        <Text className="text-xl font-bold mb-1.5">Joining Date :</Text>
        <Pressable
          className="border p-3 rounded-md"
          onPress={() => setJoiningDateOpen(true)}
        >
          <Text>{joiningDate.toLocaleDateString()}</Text>
        </Pressable>
        {joiningDateOpen && (
          <DateTimePicker
            testID="dateTimePicker"
            value={joiningDate}
            mode={"date"}
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || joiningDate;
              setJoiningDateOpen(false);
              setJoiningDate(currentDate);
            }}
          />
        )}
      </View>
      <View className="m-2">
        <Text className="text-xl font-bold mb-1.5">Employee Salary :</Text>
        <AnimatedTextInput
          placeholder="Enter employee salary"
          value={employeeSalary}
          textInputProps={{
            keyboardType: "number-pad",
          }}
          onChangeText={(text) => {
            setEmployeeSalary(text);
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
        onPress={() => saveData()}
      />
      <Button
        title="Cancel"
        buttonStyle={{ backgroundColor: "#94a3b8", padding: 18, margin: 5 }}
        titleStyle={{ fontSize: 20 }}
        onPress={() => {
          navigation.goBack();
          navigation.navigate("EmployeeList");
        }}
      />
    </ScrollView>
  );
};

export default AddEmployee;
