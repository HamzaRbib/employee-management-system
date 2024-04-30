import { View, Text } from "react-native";
import React, { useState } from "react";
import { SegmentedButtons } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

const AllGenerateReports = () => {
  const [value, setValue] = useState("attendance");
  const [data, setData] = useState([]);
  return (
    <View>
      <SegmentedButtons
        style={{ padding: 10 }}
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: "attendance",
            label: "Attendance",
            icon: "newspaper-variant-outline",
          },
          {
            value: "summary",
            label: "Summary",
            icon: "book-arrow-right",
          },
        ]}
      />
      {data.length === 0 && (
        <View className="items-center justify-center mt-52">
          <AntDesign name="database" size={120} color="#94a3b8" />
          <Text className="m-2 text-lg text-gray-400 font-semibold">No Reports found</Text>
        </View>
      )}
    </View>
  );
};

export default AllGenerateReports;
