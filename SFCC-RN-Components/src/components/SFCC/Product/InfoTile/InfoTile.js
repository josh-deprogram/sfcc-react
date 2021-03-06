/**
 * @file InfoTile.js
 * @fileoverview An InfoTile instance is a visual componenet that represnts a
 * product from a SFCC instance.
 */

import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  Dimensions,
  FlatList
} from "react-native";
import Routes from "../../../../menuItems";
import { connect } from "react-redux";
import ThumbnailImage from "../../../ImageCarousel/ThumbnailImage";

/**
 * @class
 * @name InfoTile
 * @desc - React Native component that displays basic product information from
 *    a SFCC instance.
 */
class InfoTile extends Component {
  constructor(props) {
    super(props);
    const screenSize = Dimensions.get("window");
    this.props = props;
    this.height = props.height ? props.height : screenSize.height - 46;
    this.width = props.width ? props.width : screenSize.width;
    this.state = {
      product: {
        id: "test",
        imageGroups: [
          {
            images: []
          }
        ]
      },
      imgURL: "",
      imageIndex: 0
    };
  }

  /**
   * Redux component lifecycle method used for passing in props to the component.
   * @param {Object} nextProps - The key/value pairs from the root reducer that
   *    make up the applicaitons next state.
   */
  componentWillReceiveProps(nextProps) {
    this.setState((prevState, nextProps) => ({
      ...prevState,
      product: nextProps.infoTile.product,
      imgURL: nextProps.infoTile.imageURL
    }));
  }

  /*************************************************
   * Private instance functions.
   *************************************************/

  /**
   * Event handler for the pressing of the button to get a product for showing.
   *
   * __NOTE:__  This is a method for application setup only and should be
   *            removed once there are calls capable of getting product ID's
   *            back to populate the parameters of this call in the future.
   */
  _buttonPressed() {
    this.props.actions.requestImagesForProduct("1016786");
  }

  /**
   * Sets the source of the main product image, or a _missing_ badge to show
   * that the photo that is supposed to be displayed could not be found.
   * @return {string|object}
   */
  _setImageSrc() {
    if (this.state.imgURL && this.state.imgURL !== "") {
      return { uri: this.state.imgURL };
    } else {
      return require("../../../../../assets/images/missing_img.png");
    }
  }

  /**
   * @desc - Event handler for the touch/click of a product thumbnail image.
   * @param {Image} item - The Image class isntance that is bound to the
   *    thumbnail that was selected.
   */
  _thumbnailsSelected(item) {
    this.setState(prevState => ({
      ...prevState,
      imgURL: item.disBaseLink
    }));
  }

  /**
   * @desc - Returns an array of ThumbnailImage stateless components for the current
   * ImageGroup images, or an empty View component if there are not any ImageGroups
   * in the current component state's 'product' property.
   * @return {ThumbnailImage[]|View}
   */
  _getThumbnails() {
    const thumbs =
      this.state.product.imageGroups.length &&
      this.state.product.imageGroups[this.state.imageIndex].images.length ? (
        <FlatList
          data={this.state.product.imageGroups[this.state.imageIndex].images}
          keyExtractor={item => item.disBaseLink}
          horizontal={true}
          renderItem={({ item }) => (
            <ThumbnailImage
              key={item.disBaseLink}
              src={{ uri: item.disBaseLink }}
              thumbnailSelected={() => this._thumbnailsSelected(item)}
              viewStyle={itStyles.productThumbView}
              imgStyle={itStyles.productThumbImg}
            />
          )}
        />
      ) : (
        <View />
      );

    return thumbs;
  }

  render() {
    const srcObj = this._setImageSrc();
    const thumbnails = this._getThumbnails();

    return (
      <View
        style={
          (itStyles.container,
          {
            width: this.width,
            height: this.height
          })
        }
      >
        <View style={itStyles.buttonContainer}>
          <Button
            onPress={this._buttonPressed.bind(this)}
            title="Push for record"
            color="#841584"
          />
        </View>
        <View style={itStyles.productTitleContainer}>
          <Text style={itStyles.productTitle}>{this.state.product.name}</Text>
        </View>
        <View style={itStyles.productImageContainer}>
          <Image
            key={this.state.imgURL}
            source={srcObj}
            resizeMode="contain"
            style={{
              width: undefined,
              height: undefined,
              flex: 1,
              alignSelf: "stretch"
            }}
          />
        </View>
        <View style={itStyles.productThumbsContainer}>{thumbnails}</View>
        <View style={itStyles.productDetailsContainer}>
          <Text style={itStyles.productInfoField}>
            {this.state.product.shortDescription}
          </Text>
        </View>
      </View>
    );
  }
}

const itStyles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "column",
    backgroundColor: "#ececec"
  },
  productTitleContainer: {
    flex: 0.35,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center"
  },
  productImageContainer: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    padding: 10
  },
  productThumbsContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#000000"
  },
  productThumbView: {
    width: 95,
    height: 75,
    alignItems: "stretch",
    padding: 5
  },
  productThumbImg: {
    width: 88,
    height: 65,
    alignSelf: "stretch"
  },
  productTitle: {
    fontSize: 26,
    textAlign: "center"
  },
  productInfoField: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 5
  },
  button: {},
  buttonContainer: {
    flex: 0.3,
    height: 60,
    justifyContent: "center",
    backgroundColor: "#65D0E5",
    margin: 12,
    borderWidth: 0,
    borderRadius: 8,
    paddingTop: 20,
    paddingBottom: 20
  },
  productDetailsContainer: {
    flex: 2
  }
});

export default connect(({ routes }) => ({ routes }))(InfoTile);
