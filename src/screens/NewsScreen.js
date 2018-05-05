import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  ListView,
  View,
  Linking,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import Moment from 'moment';
import { StackNavigator } from 'react-navigation';


let id = 1;
export default class NewsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Loader: true,
      articles:[]
    };
  }


  componentDidMount() {
    return fetch('https://newsapi.org/v2/top-headlines?sources=google-news-in&apiKey=1daaa98bdda74eabb558d427140ec972')
      .then((response) => {
        response.json().then(data => {
          console.log(data.articles,"res")
          let mainData = data.articles
          let arrData = [];
          mainData.forEach(element => {
            arrData.push({
              author:element.author,
              title:element.title,
              url:element.url,
              urlToImage: element.urlToImage,
              description: element.description,
              publishedAt: element.publishedAt,
              id:id
            })
            id=id+1;
          });
          this.setState({
            Loader: false,
            articles: arrData
          })
        })
      })
  }

  nextScreen=()=>{
    this.props.navigation.navigate('Fourth');

  }

  _keyExtractor = (item, index) => item.id;

  static navigationOptions = {
    title: 'Stay Tuned',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: 'tomato',
    },

  }


  render() {

    if (this.state.Loader) {
      return (
        <View style={styles.ActivityIndicator_Style}>
          <ActivityIndicator size = "large" color="#000"/>
        </View>
      );
    }

    return (
      <FlatList
    data={this.state.articles}
    keyExtractor = {this._keyExtractor}
    renderItem={(item,index) => (
      <View>
      <Image style ={styles.image} source = {{uri:(item.item.urlToImage)}}/>
      <View style={styles.padding}>
      <Text style={styles.listTitle}>{item.item.title}</Text>
      <Text style={styles.listDesc}>{item.item.description}</Text>
      <Text style={styles.list}>{Moment(item.item.publishedAt).format('DD MMM YYYY, h:m a')}</Text>
      </View>
      </View>
    )}
   />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#999",
  },
  listTitle:{
    color: '#000',
    fontSize:20
  },
  listDesc:{
    fontSize: 14,
    color: "#999",
    paddingVertical: 10
  },
  padding:{
    paddingHorizontal: 4,
  },
  image:{
    height: 300,
    resizeMode: "contain"
  }
});
