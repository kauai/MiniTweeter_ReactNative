import React, { Component } from 'react'
import { 
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    TextInput,
    AsyncStorage,
    TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Login extends Component {

    state = {
        userName:""
    }

  async componentDidMount(){
      const userName = await AsyncStorage.getItem('@Omnistack:userName')
      if(userName){
          this.props.navigation.navigate('App')
      }
  }
  
  handleLogin = async () => {
    const { userName } = this.state
    if(!userName.length) return

    await AsyncStorage.setItem('@Omnistack:userName',userName)
    this.props.navigation.navigate('App')

  }

  handleInputChange = (userName) => {
    this.setState({ userName })
  }

  render() {
    return (
       <KeyboardAvoidingView style={styles.container}>
           <View style={styles.content}>
              <View>
                 <Icon name="twitter" size={64} color="#4bb0ee"/>
              </View>
              <TextInput style={styles.input}
                // value={this.state.userName}
                onChangeText={this.handleInputChange}
                placeholder="Nome de usuario"
                returnKeyType="send"/>

                <TouchableOpacity 
                onPress={this.handleLogin}
                onSubmitEditing={this.handleLogin}
                style={styles.button}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
           </View>
       </KeyboardAvoidingView>
    )
  }

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF"
    },
  
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 30
    },
  
    input: {
      borderWidth: 1,
      borderColor: "#DDD",
      borderRadius: 5,
      height: 44,
      paddingHorizontal: 15,
      alignSelf: "stretch",
      marginTop: 30
    },
  
    button: {
      height: 44,
      alignSelf: "stretch",
      marginTop: 10,
      backgroundColor: "#4BB0EE",
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center"
    },
  
    buttonText: {
      color: "#FFF",
      fontSize: 16,
      fontWeight: "bold"
    }
  });
  