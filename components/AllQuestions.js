import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Alert, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Input } from "react-native-elements";

const cardColors = ["Diamonds", "Hearts", "Spades", "Clubs"];
const cardValues = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "Jack",
  "Queen",
  "King",
  "Ace",
];

export default function AllQuestions({ navigation }) {
  const [firstNr, setFirstNr] = useState(0);
  const [secondNr, setSecondNr] = useState(0);
  const [q2List, setQ2List] = useState([]);
  const [listNr, setListNr] = useState(null);
  const [q3List1, setQ3List1] = useState([]);
  const [q3List2, setQ3List2] = useState([]);
  const [shuffles, setShuffles] = useState(null);
  const [q5List, setQ5List] = useState([]);
  const [binaryNr, setBinaryNr] = useState(null);

  // ----------------------------- FUNCTIONS -------------------------------

  // QUESTION 1
  getOdds = () => {
    if (firstNr === 0 || secondNr === 0) {
      Alert.alert("One of the fields is empty");
      return;
    }
    var odds = [];

    for (var i = firstNr; i <= secondNr; i++) {
      if (i % 2 === 1 || i % 2 === -1) {
        odds.push(i);
      }
    }
    navigation.navigate("Question1_Result", {
      firstNr: firstNr,
      secondNr: secondNr,
      odds: odds,
    });
  };

  // QUESTION 2
  findInList = () => {
    if (listNr === null) {
      Alert.alert("The field is empty.");
      return;
    }
    q2List.includes(listNr)
      ? Alert.alert(
          "'" + listNr.toString() + "'" + " is contained in the list."
        )
      : Alert.alert(
          "'" + listNr.toString() + "'" + " is NOT contained in the list."
        );
  };

  // QUESTION 3
  concatenate = () => {
    if (q3List1.length === 0 || q3List2.length === 0) {
      Alert.alert("One of the fields is empty.");
      return;
    }
    Alert.alert("[" + q3List1.concat(q3List2).toString() + "]");
  };

  // QUESTION 4
  shuffleCards = () => {
    var cards = [];
    var value = 0;
    var color = 0;

    for (var i = 1; i <= shuffles; i++) {
      value = Math.floor(Math.random() * 13);
      color = Math.floor(Math.random() * 4);
      cards.push(cardValues[value] + " of " + cardColors[color]);
    }
    navigation.navigate("Question4_Result", { cards: cards });
  };

  // QUESTION 5
  binarySearch = () => {
    if (q5List.length === 0 || binaryNr === null || binaryNr === "") {
      Alert.alert("One of the fields is empty.");
      return;
    }

    setQ5List(
      q5List.sort((x, y) => {
        return x - y;
      })
    );

    var startIdx = 0;
    var endIdx = q5List.length - 1;

    while (startIdx <= endIdx) {
      var middleIdx = Math.floor((startIdx + endIdx) / 2);

      if (binaryNr === q5List[middleIdx]) {
        Alert.alert(
          "'" +
            binaryNr.toString() +
            "' was found at index " +
            middleIdx +
            " in the sorted array."
        );
        return;
      } else if (binaryNr > q5List[middleIdx]) {
        startIdx = middleIdx + 1;
      } else {
        endIdx = middleIdx - 1;
      }
    }
    Alert.alert("'" + binaryNr.toString() + "' was NOT found.");
    return;
  };

  // -------------------------------- VIEW ------------------------------------

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />

      {/* Question 1 */}

      <Text style={styles.title}>Question 1 - Get odd numbers</Text>
      <Input
        placeholder="First Number"
        keyboardType={"numeric"}
        onChangeText={(value) => setFirstNr(value)}
      />
      <Input
        placeholder="Second Number"
        keyboardType={"numeric"}
        onChangeText={(value) => setSecondNr(value)}
      />
      <Button title="Get Odds" onPress={getOdds} />

      {/* Question 2 */}

      <View style={styles.separation} />
      <Text style={styles.title}>Question 2 - Find if element is in list</Text>
      <Text style={styles.text}>
        Create a list using this input, with elements separated by comma, and
        without spaces. For example: 5,n,33,abc
      </Text>
      <Text style={styles.text}>List: {q2List.toString()}</Text>
      <Input
        placeholder="1,12,obj"
        autoCapitalize="none"
        onChangeText={(value) => setQ2List(value.split(","))}
      />
      <Text style={styles.text}>Element to check: </Text>
      <Input
        placeholder="Element"
        autoCapitalize="none"
        onChangeText={(value) => setListNr(value)}
      />
      <Button title="Check" onPress={findInList} />

      {/* Question 3 */}

      <View style={styles.separation} />
      <Text style={styles.title}>Question 3 - Concatenate lists</Text>
      <Text style={styles.text}>
        Create 2 lists using these inputs, with elements separated by comma, and
        without spaces. For example: 5,n,33,abc
      </Text>
      <Text style={styles.text}>First List: {q3List1.toString()}</Text>
      <Input
        placeholder="First List"
        autoCapitalize="none"
        onChangeText={(value) => setQ3List1(value.split(","))}
      />
      <Text style={styles.text}>Second List: {q3List2.toString()}</Text>
      <Input
        placeholder="Second List"
        autoCapitalize="none"
        onChangeText={(value) => setQ3List2(value.split(","))}
      />
      <Button title="Concatenate" onPress={concatenate} />

      {/* Question 4 */}

      <View style={styles.separation} />
      <Text style={styles.title}>Question 4 - Shuffle cards</Text>
      <Input
        placeholder="Number of Shuffles"
        autoCapitalize="none"
        onChangeText={(value) => setShuffles(value)}
      />
      <Button
        title="Shuffle"
        onPress={() => {
          if (shuffles === null) {
            Alert.alert("Enter the amount of shuffles.");
            return;
          }
          shuffleCards();
        }}
      />

      {/* Question 5 */}

      <View style={styles.separation} />
      <Text style={styles.title}>Question 5 - Binary sort</Text>
      <Text style={styles.text}>
        Create a numeric list using this input, with elements separated by
        comma, and without spaces. For example: 5,33,2,231. Then write the
        number to be searched.
      </Text>
      <Text style={styles.text}>
        The list is first sorted, then Binary search is applied.
      </Text>
      <Text style={styles.text}>List: {q5List.toString()}</Text>
      <Input
        placeholder="1,12,3"
        autoCapitalize="none"
        onChangeText={(value) => setQ5List(value.split(","))}
      />
      <Text style={styles.text}>Number to search: </Text>
      <Input
        placeholder="Number"
        autoCapitalize="none"
        onChangeText={(value) => setBinaryNr(value)}
      />
      <Button title="Binary Search" onPress={binarySearch} />

      <View style={{ paddingBottom: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 15,
    paddingRight: 15,
  },
  title: {
    fontWeight: "bold",
    margin: 10,
    fontSize: 17,
  },
  text: {
    margin: 3,
    marginLeft: 10,
  },
  separation: {
    paddingTop: 10,
  },
});
