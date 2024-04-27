import { View, Text, StyleSheet, StatusBar } from "react-native";
import React from "react";
import { useLayoutEffect } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import ManageEmployee from "../components/ManageEmployee";
import EmployeeDetails from "../components/EmployeeDetails";
import MoreEmployeeInfo from "../components/MoreEmployeeInfo";

const HomeScreen = () => {
  const navigation: NavigationProp<any, any> = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <View className="flex-1" style={styles.topStatusBarMargin}>
      <LinearGradient colors={["#7e22ce", "#f3e8ff"]} className="absolute w-full h-full" />
      <Text className="text-center font-bold text-[18px] mt-3">Employee Management System</Text>
      <ManageEmployee navigation={navigation} />
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
