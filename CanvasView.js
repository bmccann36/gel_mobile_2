import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { FileSystem, FaceDetector } from 'expo';
import Canvas, { Image as CanvasImage, Path2D } from 'react-native-canvas';
import { StackNavigator } from 'react-navigation'
import imageInfo from './imageInfo'


const CANVAS_H = 200
const CANVAS_W = 200

export default class CanvasView extends React.Component {

  async componentDidMount() {
    const filesList = await Expo.FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}photos`)

    //CANVAS 1 LOGIC
    let canvas = this.canvasRef
    const src1 = filesList[filesList.length - 2] // grab 2nd to last
    let srcImg = `${FileSystem.documentDirectory}photos/${src1}`
    const calData = await drawCanvasAsync(srcImg, canvas)
    const calibrate = new imageInfo(calData)
    const calResult = (calibrate.getTintsByShade('midtones'))

    // CANVAS 2 LOGIC
    let canvas2 = this.canvasRef2
    const src2 = filesList[filesList.length - 1] // grab last
    let srcImg2 = `${FileSystem.documentDirectory}photos/${src2}`
    const compData = await drawCanvasAsync(srcImg2, canvas2)
    const compare = new imageInfo(compData)
    const compResult = (compare.getTintsByShade('midtones'))

    const result = {
      blueChange: Math.round(compResult.blue - calResult.blue),
      greenChange: Math.round(compResult.green - calResult.green),
      redChange: Math.round(compResult.red - calResult.red)
    }

    console.log('** CALIBRATION **')
    console.log(calResult)
    console.log('** RESULTS **')
    console.log(result)
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

function drawCanvasAsync(srcImg, canvas) {
  return new Promise(resolve => {
    const image = new CanvasImage(canvas);
    canvas.width = CANVAS_W
    canvas.height = CANVAS_H
    const context = canvas.getContext('2d');
    image.src = srcImg
    image.addEventListener('load', () => {
      context.drawImage(image, 0, 0, 200, 115);
      context.getImageData(1, 1, 398, 228)
        .then(dataObj => {
          resolve(dataObj.data)
        })
    })
  })
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
