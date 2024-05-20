import { View, Text, Pressable, ScrollView, Alert } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "react-native-elements";
import { TextInput, Switch } from "react-native-paper";
import EmployeeType from "../types/Employee";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FirebaseAuthInstance } from "../FirebaseConfig";

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
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [joiningDateOpen, setJoiningDateOpen] = useState<boolean>(false);
  const [joiningDate, setJoiningDate] = useState<Date>(new Date());
  const [employeeSalary, setEmployeeSalary] = useState<string>("");
  const [activeEmployee, setActiveEmployee] = useState<boolean>(false);

  useEffect(() => {
    if (country) {
      setCountryCode(country!.cca2);
      setCountryName(country!.name as string);
    }
  }, [country]);

  const saveData = () => {
    if (
      fullName &&
      employeeId &&
      designation &&
      phoneNumber &&
      employeeSalary
    ) {
      if (
        employees.find((employee) => employee.employeeId === employeeId) !==
        undefined
      ) {
        Alert.alert("", "Employee ID already exists");
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
          joiningDate,
          salary: employeeSalary,
          isActive: activeEmployee,
          userId: FirebaseAuthInstance.currentUser?.uid,
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
    Alert.alert("", "Please fill all the fields");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Add Employee",
      headerTitleAlign: "center",
      headerShadowVisible: false,
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
    });
  }, []);
  return (
    <ScrollView>
      <View className="flex-1 flex-row items-center justify-center m-2">
        <View className="h-[1] w-32 bg-black mx-4"></View>
        <View className="bg-white p-6 rounded-full" style={{ elevation: 12, shadowColor: "#52006A" }}>
          <MaterialCommunityIcons name="account-tie" size={44} color="#9f4ee0" />
        </View>
        <View className="h-[1] w-32 bg-black mx-4"></View>
      </View>
      <View className="border border-[#98939c] p-3 rounded-md m-2">
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
        <TextInput
          label={"Full name"}
          value={fullName}
          mode="outlined"
          left={<TextInput.Icon icon="account-tie" size={25} />}
          onChangeText={(text) => setFullName(text)}
        />
      </View>
      <View className="m-2">
        <TextInput
          label={"Employee ID"}
          value={employeeId}
          left={
            <TextInput.Icon icon="card-account-details-outline" size={25} />
          }
          mode="outlined"
          onChangeText={(text) => setEmployeeId(text)}
        />
      </View>
      <View className="m-2">
        <TextInput
          label={"Designation"}
          value={designation}
          left={<TextInput.Icon icon="license" size={25} />}
          mode="outlined"
          onChangeText={(text) => setDesignation(text)}
        />
      </View>
      <View className="m-2">
        <TextInput
          label={"Mobile Number"}
          value={phoneNumber}
          left={<TextInput.Icon icon="cellphone" size={25} />}
          mode="outlined"
          keyboardType="number-pad"
          onChangeText={(text) => setPhoneNumber(text)}
        />
      </View>
      <View className="m-2 mt-3">
        <Pressable
          className="border p-3 rounded-md border-[#98939c]"
          onPress={() => setJoiningDateOpen(true)}
        >
          <TextInput.Icon
            className="ml-10 mt-12"
            icon="calendar"
            size={30}
            onPress={() => setJoiningDateOpen(true)}
          />
          <Text className="ml-12 text-[#4b4751]">Joining Date</Text>
          <Text className="ml-12">{joiningDate.toLocaleDateString()}</Text>
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
        <TextInput
          label={"Salary"}
          value={employeeSalary}
          left={<TextInput.Icon icon="currency-usd" size={25} />}
          mode="outlined"
          keyboardType="number-pad"
          onChangeText={(text) => setEmployeeSalary(text)}
        />
      </View>
      <View className="m-2">
        <View className="flex-row justify-between items-center border rounded-md border-[#98939c] ">
          <Text
            className="text-lg ml-4 font-bold"
            style={{ color: activeEmployee ? "#3eaf79" : "#fc6461" }}
          >
            {activeEmployee ? "Active" : "Inactive"} Employee
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
          margin: 8,
        }}
        titleStyle={{ fontSize: 20 }}
        onPress={() => saveData()}
      />
      <Button
        title="Cancel"
        buttonStyle={{ backgroundColor: "#94a3b8", padding: 18, margin: 8 }}
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
