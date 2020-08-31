import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import Card from "../components/Card";
import Input from "../components/Input";
import Colors from "../constants/colors";
import NumberContainer from "../components/NumberContainer"

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredvalue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState("");

  const onInputhandler = (inputText) => {
    setEnteredvalue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetInputhandler = () => {
    setEnteredvalue("");
  };

  const confirmedInputHandler = () => {
    const choosenNumber = parseInt(enteredValue);
    if (isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber > 99) {
      Alert.alert(
        "Invalid Number!",
        "Number has to be number between 1 to 99",
        [
          {
            text: "Okay",
            style: "destructive",
            onPress: resetInputhandler,
          },
        ]
      );
      return;
    }
    setConfirmed(true);
    setSelectedNumber(choosenNumber);
    setEnteredvalue("");
    Keyboard.dismiss()
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style =  {styles.summaryContainer}>
        <Text>You Selected</Text>
        <NumberContainer> {selectedNumber} </NumberContainer>
        <Button title = "START GAME" onPress={() => props.onStartGame(selectedNumber)}/>
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>The Game Screen</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input
            style={styles.input}
            placeholder="Enter a Number"
            keyboardType="numeric"
            maxLength={2}
            value={enteredValue}
            onChangeText={onInputhandler}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Reset"
                onPress={resetInputhandler}
                color={Colors.accent}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                onPress={confirmedInputHandler}
                color={Colors.primary}
              />
            </View>
          </View>
        </Card>

        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  button: {
    width: 100,
  },
  input: {
    width: 100,
    textAlign: "center",
  },
  summaryContainer : {
      marginTop : 20,
      alignItems : 'center'
  }
});

export default StartGameScreen;
