import React from 'react'
import { StackNavigator } from 'react-navigation';

import Home from './Home';
import GalleryScreen from './GalleryScreen'
import CanvasView from './CanvasView'
import Camera from './Camera'


const RootNavigator = StackNavigator({
  Camera: {
    screen: Camera
  },
  Home: {
    screen: Home,
  },
  CanvasView: {
    screen: CanvasView
  },

  GalleryScreen: {
    screen: GalleryScreen
  },

});

export default RootNavigator;
