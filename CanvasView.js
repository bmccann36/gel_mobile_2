import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { FileSystem, FaceDetector } from 'expo';
import Canvas, { Image as CanvasImage, Path2D } from 'react-native-canvas';
import { StackNavigator } from 'react-navigation'


const CANVAS_H = 200
const CANVAS_W = 200

export default class CanvasView extends React.Component {

  async componentDidMount() {
    let cal;
    let mod;
    let canvas = this.canvasRef
    const filesList = await Expo.FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}photos`)
    const src1 = filesList[filesList.length-1]
    let srcImg = `${FileSystem.documentDirectory}photos/${src1}`
    // let canvas2 = this.canvasRef2
    // let srcImg2 = `${FileSystem.documentDirectory}photos/Photo_2.jpg`
    const calData = await drawCanvasAsync(srcImg, canvas)
    // const compData = await drawCanvasAsync(srcImg2, canvas2)
    calResult = groupByShade(calData)
    // compResult = groupByShade(compData)
    const calRed = calResult.midtone.blueVred
    const calGreen = calResult.midtone.blueVgreen
    console.log('blue V red', calRed)
    console.log('blue V green', calGreen)
    // const compRed = compResult.midtone.blueVred
    // const compGreen = compResult.midtone.blueVgreen
    // console.log('red change', calRed - compRed)
    // console.log('green change', calGreen - compGreen)
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



function groupByShade(imageData) {
  const dataLength = Object.keys(imageData).length
  let shades = {
    shadows: [],
    midtone: [],
    highlights: []
  }
  const ignore = []
  for (let i = 0; i < dataLength; i += 4) {
    const red = imageData[i]
    const green = imageData[i + 1]
    const blue = imageData[i + 2]
    if (red > 250 || red < 20) {
      ignore.push(red, green, blue)
      continue;
    }
    else if (red < 100) {
      shades.shadows.push(red, green, blue)
    }
    else if (red < 200) {
      shades.midtone.push(red, green, blue)
    }
    else if (red < 250) {
      shades.highlights.push(red, green, blue)
    }
  }
  // console.log('highlights length', shades.highlights.length)
  // console.log('midtone length', shades.midtone.length)
  // console.log('shadows length', shades.shadows.length)
  for (let props in shades) {
    shades[props] = blueShift(shades[props])
  }
  return shades
}

// takes in an array of red, green, blue (no alpha) returns the average lack or surplus of blue compared to red and green
function blueShift(imageData) {
  // if(!imageData.length) return 'no data'
  let tints = { blueVred: [], blueVgreen: [] }
  for (let i = 0; i < imageData.length; i += 3) {
    const red = imageData[i]
    const green = imageData[i + 1]
    const blue = imageData[i + 2]
    tints.blueVred.push(blue - red)
    tints.blueVgreen.push(blue - green)
  }
  if (tints.blueVred.length) {
    const sumRed = tints.blueVred.reduce((a, b) => a + b)
    tints.blueVred = (sumRed / tints.blueVred.length)
    const sumGreen = tints.blueVgreen.reduce((a, b) => a + b)
    tints.blueVgreen = (sumGreen / tints.blueVgreen.length)
  }
  else {
    tints.blueVred = 0
    tints.blueVgreen = 0
  }
  return tints
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
      // (1, 1, 398, 228)
      context.getImageData(1, 1, 398, 228)
        .then(dataObj => {
          resolve(dataObj.data)
        })
    })
  })
}

