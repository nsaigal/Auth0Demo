import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

import {
  TextInput,
} from 'react-native';

class CustomTextField extends Component {

  render() {
    return (
      <TextInput 
      style={[styles.input]}
      placeholder={this.props.placeholder}
      secureTextEntry={this.props.secure}
      autoFocus={this.props.autoFocus}
      editable={!this.props.loading}
      // onChangeText={text => this.onInputChange(text)}
      >
      </TextInput>
    );
  }
};

const styles = StyleSheet.create({
  input: {
    padding:18,
    margin: 5,
    fontSize: 20, 
    fontWeight:'700', 
    color: 'white',
    backgroundColor: '#FFFFFF15',
    borderRadius: 10,
    textAlign: 'left',
    fontFamily: 'Avenir',
  }
});

export default CustomTextField;
