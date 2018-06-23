import React, { Component } from "react";
import { Text, ImageBackground, TouchableHighlight } from "react-native";
import { inject, observer } from "mobx-react/native";

import styles from "./styles";

@inject("store")
@observer
class TouchableImage extends Component {
  state = {
    width: null,
    hideCaption: false
  };

  onPress(event) {
    const { width } = this.state,
      { store } = this.props,
      X = event.nativeEvent.locationX;

    if (X < width * 0.3) {
      store.prevImage();
    } else if (X > width * 0.6) {
      store.nextImage();
    }
  }

  onPressIn() {
    this.setState({
      hideCaption: true
    });
  }

  onPressOut() {
    this.setState({
      hideCaption: false
    });
  }

  onImageLayout(event) {
    this.setState({
      width: event.nativeEvent.layout.width
    });
  }

  get caption() {
    let { caption, image } = this.props;
    return image.title || image.description || caption;
  }

  render() {
    const { image, store, height } = this.props,
      uri = image.link.replace("http://", "https://"),
      hideCaption = this.state.hideCaption ? styles.hiddenLabel : null;

    return (
      <TouchableHighlight
        onPress={this.onPress.bind(this)}
        onPressIn={this.onPressIn.bind(this)}
        onPressOut={this.onPressOut.bind(this)}
        style={styles.fullscreen}
      >
        <ImageBackground
          source={{ uri: uri }}
          style={[
            styles.backgroundImage,
            styles[store.orientation.toLowerCase()],
            { height: height || null }
          ]}
          onLayout={this.onImageLayout.bind(this)}
        >
          {this.caption ? (
            <Text style={[styles.imageLabel, hideCaption]}>{this.caption}</Text>
          ) : null}
        </ImageBackground>
      </TouchableHighlight>
    );
  }
}

export default TouchableImage;
