import React from 'react'
import { StackNavigator } from 'react-navigation';


import GalleryScreen from './GalleryScreen'
import CanvasView from './CanvasView'
import Camera from './Camera'


const RootNavigator = StackNavigator({
  Camera: {
    screen: Camera
  },
  CanvasView: {
    screen: CanvasView
  },
});

export default RootNavigator;
