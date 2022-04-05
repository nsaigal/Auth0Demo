import React, {Component} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

class LoginButton extends Component {

  render() {
    return (
      <TouchableOpacity
        disabled={this.props.loading}
        style={[styles.button]}
        onPress={this.props.click}>
        {this.props.loading ?
          <ActivityIndicator
            style={styles.refresher}
            size='small'
            color='white'
          />
          :
          <Text style={styles.text}>{this.props.title}</Text>
        }
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    margin: 10,
    marginTop: 20,
    backgroundColor: '#C000BD',
    borderRadius: 10,
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
    fontFamily: 'Avenir',
    fontSize: 16,
    width: '100%'
  },
  refresher: {
    width: '100%'
  }
});

export default LoginButton;