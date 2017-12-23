import { Constants, Camera, FileSystem } from 'expo';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Slider, Vibration } from 'react-native';
import { StackNavigator } from 'react-navigation';

import CanvasView from './CanvasView'

const landmarkSize = 2;
const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};
const wbOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto',
};

export default class CameraScreen extends React.Component {
  state = {
    flash: 'off',
    depth: 0,
    type: 'back',
    whiteBalance: 'auto',
    ratio: '16:9',
    ratios: [],
    photoId: 1,
    photos: [],
  };

  componentDidMount() {
    FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos').catch(e => {
      console.log(e, 'Directory exists');
    });
  }

  clearCache() {
    FileSystem.deleteAsync(`${FileSystem.documentDirectory}photos/Photo_1.jpg`)
    FileSystem.deleteAsync(`${FileSystem.documentDirectory}photos/Photo_2.jpg`)
      .then(() => {
        console.log('deleted photos')
      })
      .then(() => {
        this.setState({ photoId: 1 })
        Vibration.vibrate();
      })
      .catch(err=> console.log('the canvas is probably empty'))

  }

  getRatios = async function () {
    const ratios = await this.camera.getSupportedRatios();
    return ratios;
  };

  toggleFlash() {
    this.setState({
      flash: flashModeOrder[this.state.flash],
    });
  }

  setRatio(ratio) {
    this.setState({
      ratio,
    });
  }

  toggleWB() {
    this.setState({
      whiteBalance: wbOrder[this.state.whiteBalance],
    });
  }

  takePicture = async function () {
    if (this.camera) {
      this.camera.takePictureAsync({ base64: true }).then(data => {
        FileSystem.moveAsync({
          from: data.uri,
          to: `${FileSystem.documentDirectory}photos/Photo_${this.state.photoId}.jpg`,
        }).then(() => {
          this.setState({
            photoId: this.state.photoId + 1,
          });
          Vibration.vibrate();
        });
      });
    }
  };


  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <Camera
          ref={ref => {
            this.camera = ref;
          }}
          style={{ flex: 1 }}
          type={this.state.type}
          flashMode={this.state.flash}
          whiteBalance={this.state.whiteBalance}
          ratio={this.state.ratio}
        >
          <View
            style={{
              flex: 0.8,
              backgroundColor: 'transparent',
              opacity: 40,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity style={styles.flipButton} onPress={this.toggleFlash.bind(this)}>
              <Text style={styles.flipText}> FLASH: {this.state.flash} </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flipButton} onPress={this.toggleWB.bind(this)}>
              <Text style={styles.flipText}> WB: {this.state.whiteBalance} </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 0.1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
              alignSelf: 'flex-end',
            }}>
            <TouchableOpacity
              style={[styles.flipButton, styles.picButton, { flex: 0.3, alignSelf: 'flex-end' }]}
              onPress={this.takePicture.bind(this)}>
              <Text style={styles.flipText}> SNAP </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.flipButton, styles.galleryButton, { flex: 0.3, alignSelf: 'flex-end' }]}
              onPress={() => navigate('CanvasView')}>
              <Text style={styles.flipText}> Canvas View </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.flipButton, styles.galleryButton, { flex: 0.3, alignSelf: 'flex-end' }]}
              onPress={this.clearCache.bind(this)}>
              <Text style={styles.flipText}> Clear Cache</Text>
            </TouchableOpacity>

          </View>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#000',
  },
  // navigation: {
  //   flex: 1,
  // },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  item: {
    margin: 4,
    backgroundColor: 'indianred',
    height: 35,
    width: 80,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picButton: {
    backgroundColor: 'darkseagreen',
  },
  galleryButton: {
    backgroundColor: 'indianred',
  },
  row: {
    flexDirection: 'row',
  },
});
