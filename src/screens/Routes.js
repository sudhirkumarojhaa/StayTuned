import React, { Component } from "react";
import { StackNavigator } from 'react-navigation';
import Headlines from "./Headlines";
import Post from "./Post";

export default MyNewProject = StackNavigator({
 Headlines: {
    screen:Headlines
  },
  Post: {
    screen: Post
  }
});


