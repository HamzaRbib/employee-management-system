import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import EmloyeeList from "./screens/EmployeeList";
import AddEmployee from "./screens/AddEmployee";
import MarkAttendance from "./screens/MarkAttendance";
import Attendance from "./screens/Attendance";
import AttendanceReport from "./screens/AttendanceReport";
import AttendanceList from "./screens/AttendanceList";
import SummaryReport from "./screens/SummaryReport";
import AllGenerateReports from "./screens/AllGenerateReports";
import EditEmployee from "./screens/EditEmployee";
import OvertimeEmployees from "./screens/OvertimeEmployees";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="EmployeeList" component={EmloyeeList} />
          <Stack.Screen name="AddEmployee" component={AddEmployee} />
          <Stack.Screen name="EditEmployee" component={EditEmployee} />
          <Stack.Screen name="MarkAttendance" component={MarkAttendance} />
          <Stack.Screen name="Attendance" component={Attendance} />
          <Stack.Screen name="AttendanceReport" component={AttendanceReport} />
          <Stack.Screen name="AttendanceList" component={AttendanceList} />
          <Stack.Screen name="SummaryReport" component={SummaryReport} />
          <Stack.Screen
            name="AllGenerateReports"
            component={AllGenerateReports}
          />
          <Stack.Screen name="OvertimeEmployees" component={OvertimeEmployees} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
