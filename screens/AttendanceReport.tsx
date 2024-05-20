import { FlatList } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Employee from "../components/Employee";
import EmployeeType from "../types/Employee";
import { FirebaseAuthInstance } from "../FirebaseConfig";

const AttendanceReport = () => {
  const navigation: NavigationProp<any, any> = useNavigation();
  const [employees, setEmployees] = useState<Array<EmployeeType>>([]);
  const userId = FirebaseAuthInstance.currentUser?.uid;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Attendance Report List",
      headerTitleAlign: "center",
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
    });
  }, []);

  useEffect(() => {
    fetch("http://10.0.2.2:5000/getAllEmployees/" + userId)
      .then((response) => response.json())
      .then((data) => setEmployees(data.filter((employee: EmployeeType) => employee.isActive === true)))
      .catch((error) => console.error(error));
  }, []);

  return (
    <FlatList
      data={employees}
      renderItem={({ item }) => (
        <Employee
          employee={item}
          onPress={() => {
            navigation.goBack();
            navigation.navigate("AttendanceList", { employee: item });
          }}
        />
      )}
    />
  );
};

export default AttendanceReport;
