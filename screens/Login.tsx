import { View, Text, Alert, KeyboardAvoidingView, Image, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TextInput, Button, ActivityIndicator } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { FirebaseAuthInstance } from "../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
  const navigation: NavigationProp<any, any> = useNavigation();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [laoding, setLaoding] = useState<boolean>(false);
  const auth = FirebaseAuthInstance;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      statusBarHidden: true,
    });
  });

  const signIn = async () => {
    setLaoding(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (err: any) {
      Alert.alert("Login Error", "Login Failed: " + err.message);
    } finally {
      setLaoding(false);
    }
  };

  const signUp = async () => {
    setLaoding(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
    } catch (err: any) {
      Alert.alert("Sign Up Error", "Sign Up Failed: " + err.message);
    } finally {
      setLaoding(false);
    }
  };
  return (
    <View className="flex-1">
      <LinearGradient
        colors={["#f3e8ff", "#7e22ce"]}
        className="absolute w-full h-full"
      />
      <KeyboardAvoidingView behavior="padding"></KeyboardAvoidingView>
      <View className="mt-20">
        <MaterialIcons
          name="lock"
          size={100}
          color="black"
          style={{ alignSelf: "center" }}
        />
        <Text className="text-center mt-12 mb-4 text-slate-600">
          Wellcome To your employee management app
        </Text>
        <TextInput
          className="mx-3 my-2"
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          className="mx-3"
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={!showPassword}
          right={
            <TextInput.Icon
              icon={showPassword ? "eye" : "eye-off"}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
        {laoding ? (
          <ActivityIndicator color="black" size="large" className="m-10" />
        ) : (
          <>
            <Button
              mode="contained"
              onPress={signIn}
              className="bg-black rounded-sm p-2 mx-3 mt-6 mb-3"
            >
              Login
            </Button>
            <Button mode="text" onPress={signUp}>
              <Text className="text-blue-900 underline text-lg">
                Create account
              </Text>
            </Button>
          </>
        )}
        <View className="flex-row items-center justify-center mt-10">
          <View className="w-32 h-0.5 bg-gray-600"></View>
          <Text className="mx-3">Or continue with</Text>
          <View className="w-32 h-0.5 bg-gray-600"></View>
        </View>
        <View className="flex-row items-center justify-center gap-8 mt-6">
          <TouchableOpacity className="bg-[#d2d5e4] border border-white p-4 rounded-3xl" style={{ elevation: 12, shadowColor: "white" }}>
            <Image
              source={require("../assets/icons/google.png")}
              className="w-16 h-16"
            />
          </TouchableOpacity>
          <TouchableOpacity className="bg-[#d2d5e4] border border-white p-6 rounded-3xl" style={{ elevation: 12, shadowColor: "white" }}>
            <Image
              source={require("../assets/icons/apple.png")}
              className="w-12 h-12"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
