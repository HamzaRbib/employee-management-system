import { View } from "react-native";
import React, { useLayoutEffect, useState, useContext, useEffect } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import EmployeeType from "../server/types/Employee";
import { FlatList } from "react-native";
import { FAB } from "react-native-paper";
import Employee from "../components/Employee";
import { EmployeeContext } from "../contexts/employeeContext";
import { FirebaseAuthInstance } from "../FirebaseConfig";

const EmployeeList = () => {
  const navigation: NavigationProp<any, any> = useNavigation();
  const [employees, setEmployees] = useState<Array<EmployeeType>>([]);
  const userId = FirebaseAuthInstance.currentUser?.uid;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        onChangeText: (event: { nativeEvent: { text: any } }) => {
          setEmployees(
            employees.filter((employee) =>
              employee.employeeName
                .toLowerCase()
                .includes(event.nativeEvent.text.toLowerCase())
            )
          );
        },
        placeholder: "Search Employee",
      },
      headerTitle: "Employee List",
      headerTitleAlign: "center",
    });
  }, []);

  useEffect(() => {
    fetch("http://10.0.2.2:5000/getAllEmployees/" + userId)
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <View className="flex-1">
      <FAB
        icon="plus"
        className="absolute bottom-5 right-5 z-10"
        onPress={() => {
          navigation.goBack();
          navigation.navigate("AddEmployee", {employees: employees});
        }}
      />
      <FlatList
        data={employees}
        renderItem={({ item }) => (
          <Employee
            employee={item}
            onPress={() => {
              navigation.goBack();
              navigation.navigate("EditEmployee", { employee: item, employees: employees });
            }}
          />
        )}
      />
    </View>
  );
};

export default EmployeeList;
