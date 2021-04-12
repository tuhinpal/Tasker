import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, ToastAndroid, Dimensions } from "react-native";
import Task from "./compi/task";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {

  const [taskText, taskTextH] = useState('')
  const [renderText, renderTextH] = useState([])

  useEffect(() => {
    async function fetchsavedTasks() {
      try {
        const value = await AsyncStorage.getItem('@tasker')
        if (value !== null) {
          renderTextH(JSON.parse(value))
        }
      } catch (e) { }
    }
    fetchsavedTasks()
  }, []);


  const addTask = () => {
    if (taskText === '') {
      ToastAndroid.show("Can't set empty task", ToastAndroid.SHORT)
    } else {
      Keyboard.dismiss();
      renderTextH([...renderText, taskText])
      storeData([...renderText, taskText])
      taskTextH('')
    }
  }

  const completeTask = (index) => {
    let alltasks = [...renderText];
    alltasks.splice(index, 1);
    storeData(alltasks)
    renderTextH(alltasks)
  }


  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: "#f7f5f5" }}>
      <View style={styles.container}>

        <Text style={styles.text}>My Tasks</Text>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1
          }}
          style={{ height: Dimensions.get('window').height - 160 }}
          keyboardShouldPersistTaps='handled'
        >

          {renderText.map((eachtask, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                <Task text={eachtask} num={index + 1} />
              </TouchableOpacity>
            )
          })}

        </ScrollView>
        <StatusBar style="auto" />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ height: 80, bottom: 0, width: '100%', position: 'absolute', borderRadius: 10, backgroundColor: '#f7f5f5', justifyContent: 'center', alignItems: 'center' }}
      >
        <View style={styles.newtask}>
          <TextInput placeholder={'Write a task'} style={styles.inputbox} multiline={true} value={taskText} onChangeText={text => taskTextH(text)} />
          <TouchableOpacity style={styles.newbutton} onPress={() => addTask()}>
            <Text style={{ fontSize: 22, color: '#f7f5f5' }}>
              +
          </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('@tasker', JSON.stringify(value))
  } catch (e) { }
}



const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    marginTop: 40,
    padding: 15,
  },
  text: {
    fontSize: 25,
    fontFamily: "notoserif",
    fontWeight: "bold",
    marginBottom: 25,
  },
  newtask: {
    marginTop: 5,
    height: '100%',
    width: '100%',
    bottom: 10,
    justifyContent: 'space-between',
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 10,
    marginBottom: 'auto'
  },
  inputbox: {
    width: '75%',
    marginLeft: 10,
    height: 60,
    borderColor: '#db9440',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#f0ebeb',
    fontFamily: 'sans-serif-light',
    color: '#000',
    overflow: 'scroll'
  },
  newbutton: {
    height: 50,
    width: 50,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#db9440',
    borderRadius: 10
  }
});
