import React, { Component } from 'react';
import { View, Text,Button} from 'react-native';

export default class YieldPrediction extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> textInComponent </Text>
        <Button title="Yiled Prediction" onPress={()=>this.props.naviagtion.navigate('homePage')}></Button>
      </View>
    );
  }
}
