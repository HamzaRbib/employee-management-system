import EmployeeType from "../types/Employee";
import { View, Text, Pressable, ScrollView, Alert } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import AnimatedTextInput from "react-native-animated-placeholder-textinput";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, Switch } from "react-native-elements";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const EditEmployee = ({
  route,
}: {
  route: { params: { employee: EmployeeType; employees: Array<EmployeeType> } };
}) => {
  const employee = route.params.employee;
  const employees = route.params.employees;
  const navigation: NavigationProp<any, any> = useNavigation();
  const [countryCode, setCountryCode] = useState<CountryCode>(
    employee.country.countryCode as CountryCode
  );
  const [countryName, setCountryName] = useState<string>(
    employee.country.countryName
  );
  const [country, setCountry] = useState<Country>();
  const [fullName, setFullName] = useState<string>(employee.employeeName);
  const [employeeId, setEmployeeId] = useState<string>(employee.employeeId);
  const [designation, setDesignation] = useState<string>(employee.designation);
  const [phoneNumber, setMobileNumber] = useState<string>(employee.phoneNumber);
  const [date, setDate] = useState<Date>(new Date(employee.dateOfBirth));
  const [dateOpen, setDateOpen] = useState<boolean>(false); // open and close date picker
  const [joiningDateOpen, setJoiningDateOpen] = useState<boolean>(false);
  const [joiningDate, setJoiningDate] = useState<Date>(
    new Date(employee.joiningDate)
  );
  const [employeeSalary, setEmployeeSalary] = useState<string>(
    employee.salary.toString()
  );
  const [activeEmployee, setActiveEmployee] = useState<boolean>(
    employee.isActive
  );

  useEffect(() => {
    if (country) {
      setCountryCode(country!.cca2);
      setCountryName(country!.name as string);
    }
  }, [country]);

  const saveData = () => {
    if (fullName && employeeId && designation && phoneNumber) {
      const curerntEmployeeId = employeeId;
      if (
        employees.find((employee) => employee.employeeId === employeeId && employee.employeeId !== curerntEmployeeId) !==
        undefined
      ) {
        alert("Employee ID already exists");
        return;
      }
      fetch("http://10.0.2.2:5000/editEmployee/" + employeeId, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeName: fullName,
          employeeId,
          designation,
          phoneNumber,
          dateOfBirth: date,
          joiningDate,
          salary: employeeSalary,
          isActive: activeEmployee,
          country: {
            countryCode,
            countryName,
          },
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
        return
    }
    alert("Please fill all the fields");
  };

  const deleteData = () => {
    fetch("http://10.0.2.2:5000/deleteEmployee/" + employeeId, {
      method: "DELETE",
    })
      .then((response) => {
        console.log(response);
        navigation.goBack();
        navigation.navigate("EmployeeList");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Edit Employee",
      headerTitleAlign: "center",
      headerLeft: () => (
        <Pressable
          onPress={() => {
            navigation.goBack();
            navigation.navigate("EmployeeList");
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
      ),
      headerRight: () => (
        <Pressable
          className="mr-3"
          onPress={() => {
            Alert.alert(
              "Delete Employee",
              "Are you sure you want to delete this employee?",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                {
                  text: "OK",
                  style: "destructive",
                  onPress: () => deleteData(),
                },
              ]
            );
          }}
        >
          <FontAwesome5 name="trash" size={24} color="red" />
        </Pressable>
      ),
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
          placeholder="Edit full name"
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
          placeholder="Edit employee ID"
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
          placeholder="Edit designation"
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
          placeholder="Edit mobile number"
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
          placeholder="Edit employee salary"
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

export default EditEmployee;
