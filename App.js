import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AllQuestions from "./components/AllQuestions.js";
import Question1_Result from "./components/Question1_Result.js";
import Question4_Result from "./components/Question4_Result.js";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="AllQuestions"
          component={AllQuestions}
          options={{ title: "Functions" }}
        />
        <Stack.Screen
          name="Question1_Result"
          component={Question1_Result}
          options={{ title: "Odd Numbers" }}
        />
        <Stack.Screen
          name="Question4_Result"
          component={Question4_Result}
          options={{ title: "Shuffled Cards" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
