
import { StackNavigator } from 'react-navigation';

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
