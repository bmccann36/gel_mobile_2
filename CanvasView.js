import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { FileSystem, FaceDetector } from 'expo';
import Canvas, { Image as CanvasImage, Path2D } from 'react-native-canvas';
import { StackNavigator } from 'react-navigation'


const CANVAS_H = 200
const CANVAS_W = 200

export default class CanvasView extends React.Component {

  componentDidMount(){
    let canvas = this.canvasRef
    let srcImg = `${FileSystem.documentDirectory}photos/Photo_1.jpg`
    paintCanvas(srcImg, canvas)
    let canvas2 = this.canvasRef2
    let srcImg2 = `${FileSystem.documentDirectory}photos/Photo_2.jpg`
    paintCanvas(srcImg2, canvas2)


  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <Canvas ref={(canvas) => { this.canvasRef = canvas }} />
        <Canvas ref={(canvas) => { this.canvasRef2 = canvas }} />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function paintCanvas(srcImg, canvas){
  const image = new CanvasImage(canvas);
  canvas.width = CANVAS_W
  canvas.height = CANVAS_H
  const context = canvas.getContext('2d');
  image.src = srcImg
  image.addEventListener('load', () => {
    context.drawImage(image, 0, 0, 200, 115);
  })
}

