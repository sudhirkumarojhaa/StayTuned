import React, { Component } from 'react';
import { WebView,FlatList,View,StyleSheet,Button,Text,ActivityIndicator } from 'react-native';
import { StackNavigator } from "react-navigation";
export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Loader: true,
      url:''
    };
  }
  loader=()=> {
    <View style={styles.ActivityIndicator_Style}>
      <ActivityIndicator size = "large" color="#000"/>
    </View>
  }
  PostLink = () => {
    this.props.navigation.navigate("Notes")
  };

  static navigationOptions = {
  title:'Notes'
  };


  render() {
    const { params } = this.props.navigation.state;
    const webUrl = params ? params.listItem : null;

    return (
      <View style={styles.container}>
      {/* <View style={styles.Header}>
         <Text style={styles.headerText}>HEADLINES</Text>
         <Text style={styles.headerTab}   onPress={this.PostLink.bind(this)}>NOTES</Text>
      </View> */}
      <WebView style={styles.container}
        onLoadStart = {this.loader()}
        source = {{uri: webUrl}}
      />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  TextStyle: {
    color: '#000',
    fontSize: 20
  },
  Header: {
    backgroundColor: "#0c9",
    color: "#fff",
    flexDirection: "row",
    justifyContent:"space-around",
    alignItems:"center"
  },
  headerText:{
      fontSize: 16,
      color: "#fff",
      fontWeight: "bold",
      paddingVertical: 10,
      letterSpacing:2,
      flex:1,
      textAlign:'center'
  },
  headerTab:{
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    paddingVertical: 20,
    letterSpacing:2,
    borderLeftWidth: 2,
    borderLeftColor: '#fff',
    flex:1,
     textAlign: 'center'
  }
});
