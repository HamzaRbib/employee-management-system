import {
  ScrollView,
  Text,
  StyleSheet,
  StatusBar,
  View,
  Pressable,
  Alert,
} from "react-native";
import React from "react";
import { useLayoutEffect } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import ManageEmployee from "../components/homeScreen/Header";
import EmployeeDetails from "../components/homeScreen/MiddleSection";
import MoreEmployeeInfo from "../components/homeScreen/Fotter";
import { FontAwesome5 } from "@expo/vector-icons";
import { FirebaseAuthInstance } from "../FirebaseConfig";

const HomeScreen = () => {
  const navigation: NavigationProp<any, any> = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      statusBarHidden: true,
    });
  }, []);

  const logout = () => {
    Alert.alert(
      "Signing Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          style: "destructive",
          onPress: () => FirebaseAuthInstance.signOut(),
        },
      ]
    );
  };

  return (
    <ScrollView className="flex-1" style={{}}>
      <LinearGradient
        colors={["#7e22ce", "#f3e8ff"]}
        className="absolute w-full h-full"
      />
      <View className="flex-row items-center justify-center mt-5 mb-2">
        <Text className="flex-1 text-center ml-3 font-bold text-[18px]">
          Employee Management System
        </Text>
        <Pressable className="flex-2 pr-3" onPress={logout}>
          <FontAwesome5 name="sign-out-alt" size={24} color="black" />
        </Pressable>
      </View>
      <ManageEmployee />
      <EmployeeDetails />
      <MoreEmployeeInfo />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  topStatusBarMargin: {
    marginTop: StatusBar.currentHeight,
  },
});

export default HomeScreen;
