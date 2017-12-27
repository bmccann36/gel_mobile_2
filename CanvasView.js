import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { FileSystem, FaceDetector } from 'expo';
import Canvas, { Image as CanvasImage, Path2D } from 'react-native-canvas';
import { StackNavigator } from 'react-navigation'


const CANVAS_H = 200
const CANVAS_W = 200

export default class CanvasView extends React.Component {

  componentDidMount() {
    let cal;
    let mod;
    let canvas = this.canvasRef
    let srcImg = `${FileSystem.documentDirectory}photos/Photo_1.jpg`
    let canvas2 = this.canvasRef2
    let srcImg2 = `${FileSystem.documentDirectory}photos/Photo_2.jpg`

    // drawCanvasAsync(srcImg, canvas)
    //   .then(data => { console.log((Object.keys(data)).length) })
    const p1 = drawCanvasAsync(srcImg, canvas)
    const p2 = drawCanvasAsync(srcImg2, canvas2)
    Promise.all([p1, p2])
      .then((result) => {
        cal = (result[0])
        mod = (result[1])
      })


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


function drawCanvasAsync(srcImg, canvas) {
  return new Promise(resolve => {
    const image = new CanvasImage(canvas);
    canvas.width = CANVAS_W
    canvas.height = CANVAS_H
    const context = canvas.getContext('2d');
    image.src = srcImg
    image.addEventListener('load', () => {
      context.drawImage(image, 0, 0, 200, 115);
      // (1, 1, 398, 228)
      context.getImageData(1, 1, 1, 1)
        .then(dataObj => {
          resolve(dataObj.data)
        })
    })
  })
}

