
import React from 'react';
import {  Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';



export default class home extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
      <Button
        title="Navigate Gallery Screen"
        onPress={() =>
          navigate('GalleryScreen')
        }
      />
      <Button
        title="CanvasView"
        onPress={() =>
          navigate('CanvasView')
        }
      />
      </View>
    )
  }
}
