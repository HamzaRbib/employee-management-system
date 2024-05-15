import { View, Text, StyleSheet, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { useLayoutEffect } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import ManageEmployee from "../components/homeScreen/Header";
import EmployeeDetails from "../components/homeScreen/MiddleSection";
import MoreEmployeeInfo from "../components/homeScreen/Fotter";
import { EmployeeContext } from "../contexts/employeeContext";
import EmployeeType from "../types/Employee";

const HomeScreen = () => {
  const navigation: NavigationProp<any, any> = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      statusBarHidden: true,
    });
  }, []);

  return (
    <View className="flex-1" style={{}}>
      <LinearGradient
        colors={["#7e22ce", "#f3e8ff"]}
        className="absolute w-full h-full"
      />
      <Text className="text-center font-bold text-[18px] mt-3">
        Employee Management System
      </Text>
        <ManageEmployee />
        <EmployeeDetails />
        <MoreEmployeeInfo />
    </View>
  );
};

const styles = StyleSheet.create({
  topStatusBarMargin: {
    marginTop: StatusBar.currentHeight,
  },
});

export default HomeScreen;
