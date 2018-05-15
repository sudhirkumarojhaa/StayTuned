import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  Button,
  ListView,
  View,
  Linking,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import Moment from "moment";
import { StackNavigator } from "react-navigation";

let id = 1;
export default class Headlines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Loader: true,
      articles: []
    };
  }

  componentDidMount() {
    return fetch(
      "https://newsapi.org/v2/top-headlines?sources=google-news-in&apiKey=1daaa98bdda74eabb558d427140ec972"
    ).then(response => {
      response.json().then(data => {
        let mainData = data.articles;
        let arrData = [];
        mainData.forEach(element => {
          arrData.push({
            author: element.author,
            title: element.title,
            url: element.url,
            urlToImage: element.urlToImage,
            description: element.description,
            publishedAt: element.publishedAt,
            id: id
          });
          id = id + 1;
        });
        this.setState({
          Loader: false,
          articles: arrData
        });
      });
    });
  }

  static navigationOptions = {
  title:'Headlines'
  };


  PostLink = url => {
    this.props.navigation.navigate("Post", {
      listItem: url
    });
  };

  render() {
    if (this.state.Loader) {
      return (
        <View style={styles.ActivityIndicator_Style}>
          <ActivityIndicator size="large" color="orange" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.articles}
          renderItem={(item, index) => (
            <View style={styles.card}>
              <Image
                style={styles.image}
                source={{ uri: item.item.urlToImage }}
              />
              <View style={styles.padding}>
                <Text style={styles.listTitle}>{item.item.title}</Text>
                <Text style={styles.listDesc}>{item.item.description}</Text>

                <View style={styles.inline}>
                  <TouchableOpacity
                    onPress={this.PostLink.bind(this, item.item.url)}
                  >
                    <Text style={styles.readMore}>READ MORE ...</Text>
                  </TouchableOpacity>
                  <Text style={styles.time}>
                    {Moment(item.item.publishedAt).format("DD MMM YYYY, hh:mm a")}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
        <View style={styles.footer}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  card: {
    backgroundColor: "#ffff",
    marginBottom: 16,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
    padding: 5,
    paddingBottom: 10
  },
  readMore: {
    padding: 5,
    paddingHorizontal: 10,
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: '#000',
    color: "#fff",
    fontSize: 12
  },
  time: {
    fontWeight: "bold",
    padding: 5,
  },
  listTitle: {
    color: "#000",
    fontSize: 20
  },
  listDesc: {
    fontSize: 14,
    color: "#999",
    paddingVertical: 10
  },
  image: {
    height: 300,
    resizeMode: "contain"
  },
  footer: {
    width: "100%",
    height: 40,
    backgroundColor: "#000"
  },
  inline: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ActivityIndicator_Style: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
