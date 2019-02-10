import React, { Component } from 'react'
import { View,FlatList, Text,StyleSheet,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import api from '../services/Api'
import Tweet from '../components/Tweet';
import socket from 'socket.io-client'

export default class Timeline extends Component{

  state = {
      tweets:[]
  }

   static navigationOptions =({ navigation }) => ({
        title: "Inicio",
        headerRight:(
           <TouchableOpacity onPress={() => navigation.navigate('New')}>
              <Icon 
              style={{marginRight:20}}
              name="add-circle-outline"
              size={24}
              color="#4bb0ee"/>
           </TouchableOpacity>
        )
   })

   async componentDidMount(){
      this.subscribeToEvents()
      const response = await api.get('tweets')
      this.setState({tweets: response.data})

   }

    //config socket.io
  subscribeToEvents = () => {
    const io = socket('http://10.0.2.2:3001')
    io.on('tweet',data => {
        console.log(data)
        this.setState({ tweets:[data,...this.state.tweets ] })
    }) 

    io.on('like',data => {
       this.setState({ tweets:this.state.tweets.map(item => {
            return item._id === data._id ? data : item
      })
     })
    })
 }
 ///////////////////////////////////////////

  render() {
    return (
            <View style={styles.container}>
              <FlatList
                 data={this.state.tweets}
                 keyExtractor={tweet => tweet._id}
                 renderItem={({ item }) => <Tweet tweet={item}/>}
              />
            </View>
        )
  }
 
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF"
    }
  });

