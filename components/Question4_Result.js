import React from "react";
import { Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Question4_Result({ route }) {
  return (
    <ScrollView>
      <Text style={{ fontSize: 20, margin: 3 }}>
        Shuffled cards:
        {"\n \n"}
        {route.params.cards.map((string, idx) => (
          <Text key={idx}>
            {string}
            {"\n"}
          </Text>
        ))}
      </Text>
    </ScrollView>
  );
}
