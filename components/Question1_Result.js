import React from "react";
import { Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Question1_Result({ route }) {
  return (
    <ScrollView>
      <Text style={{ fontSize: 20, margin: 3 }}>
        Odd Numbers between {route.params.firstNr} and {route.params.secondNr}:
        {"\n \n"}
        {route.params.odds.map((nr, idx) => (
          <Text key={idx}>{nr.toString()} </Text>
        ))}
      </Text>
    </ScrollView>
  );
}
