import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const GameScreen = props => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, props.userChoice)
  );

  const currentLow = useRef(1)
  const currentHigh = useRef(100)
  

  const onDirectionHandler = direction => {
    if((direction === 'Lower' && currentGuess < props.userChoice) || (direction === 'Greater' && 
    currentGuess > props.userChoice)) {
        Alert.alert("Don\'t lie", "You know that wrong...", [{text : 'Sorry!', style :'cancel'}])
        return
    } 

    if(direction === 'Lower'){
        currentHigh.current = currentGuess
    } else {
        currentLow.current = currentGuess
    }

    const newNumber = generateRandomBetween(currentLow.current,currentHigh.current,currentGuess)
    setCurrentGuess(newNumber)
  }

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={() => onDirectionHandler("Lower")} />
        <Button title="GREATER" onPress={() => onDirectionHandler("Greater")} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%'
  }
});

export default GameScreen;
