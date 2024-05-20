import { View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Employee from "../components/Employee";
import { FlatList } from "react-native";
import EmployeeType from "../types/Employee";
import { FirebaseAuthInstance } from "../FirebaseConfig";

const MarkAttendance = () => {
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
      headerTitle: "Mark Attendance",
      headerTitleAlign: "center",
    });
  }, []);

  useEffect(() => {
    fetch("http://10.0.2.2:5000/getAllEmployees/" + userId)
      .then((response) => response.json())
      .then((data) => setEmployees(data.filter((employee: EmployeeType) => employee.isActive === true)))
      .catch((error) => console.error(error));
  }, []);

  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={employees}
        renderItem={({ item }) => (
          <Employee
            employee={item}
            onPress={() => {
              navigation.goBack();
              navigation.navigate("Attendance", { employee: item });
            }}
          />
        )}
      />
    </View>
  );
};

export default MarkAttendance;
