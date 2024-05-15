import { View, Text } from "react-native";
import React from "react";
import Employee from "./Employee";
import { DataTable } from "react-native-paper";
import EmployeeType from "../types/Employee";

const Summary = ({employee}: {employee: EmployeeType}) => {
  return (
    <View className="bg-white m-2" style={{elevation: 10, shadowColor: "#52006A"}}>
      <Employee employee={employee} onPress={() => null} />
      <DataTable>
        <DataTable.Row>
          <DataTable.Cell
            className="bg-[#3eaf79]"
            textStyle={{
              width: "100%",
              textAlign: "center",
              color: "white",
              fontSize: 15,
            }}
          >
            P
          </DataTable.Cell>
          <DataTable.Cell
            className="bg-[#fc6461]"
            textStyle={{
              width: "100%",
              textAlign: "center",
              color: "white",
              fontSize: 15,
            }}
          >
            A
          </DataTable.Cell>
          <DataTable.Cell
            className="bg-[#f4ae69]"
            textStyle={{
              width: "100%",
              textAlign: "center",
              color: "white",
              fontSize: 15,
            }}
          >
            H-D
          </DataTable.Cell>
          <DataTable.Cell
            className="bg-[#21b1ca]"
            textStyle={{
              width: "100%",
              textAlign: "center",
              color: "white",
              fontSize: 15,
            }}
          >
            H
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell
            textStyle={{
              width: "100%",
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            2
          </DataTable.Cell>
          <DataTable.Cell
            textStyle={{
              width: "100%",
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            0
          </DataTable.Cell>
          <DataTable.Cell
            textStyle={{
              width: "100%",
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            0
          </DataTable.Cell>
          <DataTable.Cell
            textStyle={{
              width: "100%",
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            0
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>
      <View className="flex-row justify-between">
        <View className="flex-1 mx-2 my-1">
          <View className="flex-row justify-between">
            <Text>Debet : </Text>
            <Text className="font-bold">$ 0</Text>
          </View>
          <View className="flex-row justify-between">
            <Text>Bonus : </Text>
            <Text className="font-bold">$ 0</Text>
          </View>
        </View>
        <View className="flex-1 mx-2 my-1">
          <View className="flex-row justify-between">
            <Text>OT Hours : </Text>
            <Text className="font-bold">0.00</Text>
          </View>
          <View className="flex-row justify-between">
            <Text>OT Wages : </Text>
            <Text className="font-bold">$ 0</Text>
          </View>
        </View>
      </View>
      <View className="items-end mx-2">
        <Text className="text-lg font-bold text-blue-400">Total : $ 0</Text>
      </View>
    </View>
  );
};

export default Summary;
