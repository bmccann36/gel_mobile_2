import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { FileSystem, FaceDetector } from 'expo';
import Canvas, { Image as CanvasImage, Path2D } from 'react-native-canvas';


const pictureSize = 150;

export default class GalleryScreen extends React.Component {
  state = {
    images: {},
    photos: [],
  };

  componentDidMount() {
    FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'photos').then(photos => {
      this.setState(
        {
          photos,
        },
      );
    });
  }
  handleImageRect(canvas) {
    const image = new CanvasImage(canvas);
    canvas.width = 300;
    canvas.height = 400;

    const context = canvas.getContext('2d');


    image.src = `${FileSystem.documentDirectory}photos/Photo_3.jpg`
    image.addEventListener('load', () => {
      console.log('image is loaded');
      context.drawImage(image, 0, 0, 300, 400);
      context.getImageData(0,0,10,10)
      .then( data => {
        console.log(data)
      })
    });
  }


  render() {
    // console.log(`${FileSystem.documentDirectory}photos/${this.state.photos[0]}`)
    const imgPath = `${FileSystem.documentDirectory}photos/${this.state.photos[0]}`
    // console.log(imgPath)


    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={this.props.onPress}>
          <Text>Back</Text>
        </TouchableOpacity>
        <View style={styles.exampleLeft}>
          <Canvas ref={this.handleImageRect} />
        </View>
      </View>
    );
  }
}

const cell = {
  flex: 1,
  padding: 10,
  justifyContent: 'center',
  alignItems: 'center',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  pictures: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  exampleLeft: {
    ...cell,
  },
  picture: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    resizeMode: 'contain',
  },
  pictureWrapper: {
    width: pictureSize,
    height: pictureSize,
    margin: 5,
  },
  backButton: {
    padding: 20,
    marginBottom: 4,
    backgroundColor: 'indianred',
  },
});
