import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "mobx-react/native";

import ImgurCarousel from "./components/ImgurCarousel";
import { LANDSCAPE, PORTRAIT } from "./Constants";
import Store from "./Store";

export default class App extends Component {
  onLayout(event) {
    const { width, height } = event.nativeEvent.layout;
    const orientation = width > height ? LANDSCAPE : PORTRAIT;

    Store.changeOrientation(orientation);
    Store.updateScreenSize(width, height);
  }

  componentWillMount() {
    Store.fetchImages();
  }

  render() {
    return (
      <Provider store={Store}>
        <View style={styles.container} onLayout={this.onLayout.bind(this)}>
          <ImgurCarousel />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  }
});
