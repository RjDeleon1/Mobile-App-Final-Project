import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View,  Button, Alert, Image, TextInput, TouchableHighlight, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Component } from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Firebase from 'firebase';
import { FlatList } from 'react-native-gesture-handler';


let config = {
  apiKey: "AIzaSyDAyyaH__1lkyyl_8g2FdjMmHSjNnm2noY",
  authDomain: "final-projecft-2c2e2.firebaseapp.com",
  databaseURL: "https://final-projecft-2c2e2.firebaseio.com",
  projectId: "final-projecft-2c2e2",
  storageBucket: "final-projecft-2c2e2.appspot.com",
  messagingSenderId: "807770925390",
  appId: "1:807770925390:web:33a26127bd37566c63961f",
    measurementId: "G-NWDF61RSBD"
};

let app = Firebase.initializeApp(config);
export const db = app.database();

let listPurchases = db.ref('/purchases');
let info2 = [];

let keys = ["Date: ", "Description: ", "Place: ", "Type of Purchase: ", "Value: "];


function HomeScreen({ navigation }){
  return(
    <View style={styles.container}>
      <Image style={styles.image} source={require('./assets/DTCC.png')} />
      <Text style={styles.text}>  Welcome to this Expense Tracker App</Text>
      <Text style={styles.text}> Add expenses to the tracker and we will display all expenses that you have entered</Text>
      <Text style={styles.text}> Click on any of the following links to continue</Text>

      <Text>{''}</Text>
      <TouchableHighlight
        style={styles.button}
          underlayColor="white"
          onPress={() => navigation.navigate('Summary of expenses')}>
          <Text style={styles.buttonText}>Summary</Text>
      </TouchableHighlight>

      <Text>{''}</Text>
      <TouchableHighlight
        style={styles.button}
          underlayColor="white"
          onPress={() => navigation.navigate('New Expenses')}>
          <Text style={styles.buttonText}>Add New Expenses</Text>
      </TouchableHighlight>
    </View>
  );
}

class Summary extends Component{ 
  constructor(props){
    super(props);
    state = {
      value: [],
      type: [],
      place: [],
      description: [],
      date: [],
   }
};

componentDidMount() {
  info2 = [];
  let i = 0;
  let k = 1;
  let info = listPurchases;
  info.on("value", snapshot => {
    snapshot.forEach((childSub) =>{
      let key = childSub.key;
      childSub.forEach((child2) => {
        let key2 = child2.val();
        console.log("Key is " + key + " Data is " + key2);
        if(i == 4){
          info2.push(keys[i] + key2);
          i = 0;
          info2.push('______________________________________________________');
        }
        else if (i == 0) {
          info2.push("Purchase #" + k);
          info2.push(keys[i] + key2);
          k++;
          i++;
        }
        else{
          info2.push(keys[i] + key2);
          i++;
        }
      });
    });
  });
}


render(){
  return(
  <View style={styles.container}>   
      <Text style={styles.text}>Welcome To The Expenses Summary Page</Text>
      <Text style={styles.text}>Here you will find all expenses that have been added!</Text>
      <Text style={styles.text}> List of expenses: </Text>

      <FlatList style={styles.list}
        data={info2}
        renderItem={({ item }) => (
        <Text style={styles.listText}>{item}</Text>
        )}
      />

    <Text>{''}</Text>
      <TouchableHighlight
        style={styles.button}
          underlayColor="white"
          onPress={() => this.props.navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Home</Text>

      </TouchableHighlight>
      <Text>{''}</Text>
      <TouchableHighlight
        style={styles.button}
          underlayColor="white"
          onPress={() => this.props.navigation.navigate('New Expenses')}
        >
          <Text style={styles.buttonText}>Add New Expenses</Text>

      </TouchableHighlight>
  </View>
  );
}
}


class NewExpenses extends Component{

  //Constructor
  constructor(){
    super();
    this.state = {
      value: "", 
      place: "",
      type: "",
      date: "",
      description:"",
    };


  }

  handleValue= e => {
    this.setState({
      value: e.nativeEvent.text
    });
  };
  handleType= e => {
    this.setState({
      type: e.nativeEvent.text
      
    });
  };
  handlePlace= e => {
    this.setState({
      place: e.nativeEvent.text
      
    });
  };
  handleDate= e => {
    this.setState({
      date: e.nativeEvent.text
      
    });
  };
  handleDescription= e => {
    this.setState({
      description: e.nativeEvent.text
      
    });
  };

  handleSubmit = () => {
    let addItem = (Description, Date, Place, Type, Value) => {
      db.ref('/purchases').push({
        value:Value,
        place:Place,
        type:Type,
        date:Date,
        description:Description,
      });
    };


    addItem(this.state.description, this.state.date, this.state.place, this.state.type, this.state.value);
    Alert.alert('Purhcase saved successfully');
  };


render(){
  return (
    <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset='10'>
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to New Expenses screen!</Text>
      <Text style={styles.text}>Here you will be able to add new expenses to the tracker!</Text>
      <Text style={styles.text}>Once you are done you can go to the Summary screen to see all other expenses</Text>

              {/* Code for Adding new expenses  */}
    
      <Text style={styles.text}>Value of purchase:</Text>
      <TextInput style={styles.input} 
      onChange={this.handleValue}
      keyboardType="numeric"
      placeholder="Value"
       />      

      <Text style={styles.text}>Place of purchase:</Text>
      <TextInput style={styles.input} 
      onChange={this.handlePlace} 
      placeholder="Business Name"
      />      

      <Text style={styles.text}>Type of Purhcase:</Text>
      <TextInput style={styles.input}
       onChange={this.handleType}
       placeholder="Type of Purchase"
       />      

      <Text style={styles.text}>Date of purchase:</Text>
      <TextInput style={styles.input} 
      onChange={this.handleDate} 
      keyboardType="numbers-and-punctuation"
      placeholder="Date"
      />  

      <Text style={styles.text}>Description for the purchase:</Text>
      <TextInput style={styles.input}
       onChange={this.handleDescription}
       placeholder="Description"
       />         

      <Text>{''}</Text>
      <TouchableHighlight
        style={styles.button}
          underlayColor="white"
          onPress={this.handleSubmit}
        >
          <Text style={styles.buttonText}>Add</Text>

      </TouchableHighlight>

      <Text>{''}</Text>
      <TouchableHighlight
        style={styles.button}
          underlayColor="white"
          onPress={() => this.props.navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Home</Text>

      </TouchableHighlight>

      <Text>{''}</Text>
      <TouchableHighlight
        style={styles.button}
          underlayColor="white"
          onPress={() => this.props.navigation.navigate('Summary of expenses')}
        >
          <Text style={styles.buttonText}>Summary</Text>

      </TouchableHighlight>

    </View>
    </ScrollView>
    </KeyboardAvoidingView>
   );
  }
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Summary of expenses" component={Summary} />
        <Stack.Screen name="New Expenses" component={NewExpenses} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightblue",
    alignItems: 'center',
    flex: 1,
  },

  text:{
    fontSize: 16,
    marginTop: 25,
    marginBottom: 25,
    textAlign: "center",
  },

  listText:{
    fontSize:18,
    marginTop: 10,
    textAlign: "center",
    
    
  },

  list:{
    backgroundColor:"white",
    borderWidth: 8,
    borderColor: "lightblue",
    },

  image:{
    marginTop: 20,
    width: "100%",
    height: 75,

  },

  input: {
    height: 50,
    width:250,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },

  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },

  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',

  }
});