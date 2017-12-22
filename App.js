import React from 'react'
import { StackNavigator } from 'react-navigation';

import Home from './Home';
import GalleryScreen from './GalleryScreen'
import CanvasView from './CanvasView'


const RootNavigator = StackNavigator({
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
