import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { FileSystem, FaceDetector } from 'expo';
import Canvas, { Image as CanvasImage, Path2D } from 'react-native-canvas';



const CANVAS_H = 200
const CANVAS_W = 200

export default class GalleryScreen extends React.Component {
  state = {
    images: {},
    photos: [],
  };

  // componentDidMount() {
  //   FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'photos')
  //     .then(photos => {
  //       this.setState({ photos })
  //     })
  // }


  handleImageRect(canvas) {
    const image = new CanvasImage(canvas);
    canvas.width = CANVAS_W
    canvas.height = CANVAS_H
    const context = canvas.getContext('2d');
    image.src = `${FileSystem.documentDirectory}photos/Photo_1.jpg`
    image.addEventListener('load', () => {
      context.drawImage(image, 0, 0, 200, 115);
      // context.getImageData(1, 1, 1, 1)
      //   .then(data => {
      //     console.log(data)
      //   })
    })
  }

  handleImageRect2(canvas) {
    const image = new CanvasImage(canvas);
    canvas.width = CANVAS_W
    canvas.height = CANVAS_H
    const context = canvas.getContext('2d');
    image.src = `${FileSystem.documentDirectory}photos/Photo_2.jpg`
    image.addEventListener('load', () => {
      context.drawImage(image, 0, 0, 200, 115);
      context.getImageData(0, 0, 1, 1)
        .then(data => {
          console.log(data)
        })
    })
  }

  // context.getImageData(398, 228, 1, 1)

  render() {

    return (

      <View style={styles.container}>
        <Canvas ref={this.handleImageRect} />
        <Canvas ref={this.handleImageRect2} />
      </View>

    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backButton: {
    padding: 20,
    marginBottom: 4,
    backgroundColor: 'indianred',
  },
});



