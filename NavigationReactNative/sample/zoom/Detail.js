import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import {NavigationBackHandler, SharedElement} from 'navigation-react-native';

export default ({color, stateNavigator}) => {
  const {url} = stateNavigator.stateContext;
  return (
    <View style={styles.detail}>
      <NavigationBackHandler stateNavigator={stateNavigator} />
      <TouchableHighlight
        underlayColor="#fff"
        onPress={() => {
          if (url === stateNavigator.stateContext.url)
            stateNavigator.navigateBack(1);
        }}>
        <Text style={styles.back}>X</Text>
      </TouchableHighlight>
      <SharedElement
        name={color}
        data={{color}}
        stateNavigator={stateNavigator}>
        <View
          style={[
            {backgroundColor: color},
            styles.color
          ]} />
      </SharedElement>
      <SharedElement
        name={`text${color}`}
        data={{color, fontSize: 80, fontColor: '#000'}}
        stateNavigator={stateNavigator}>
        <Text style={styles.text}>{color}</Text>
      </SharedElement>
    </View>
  );
};

const styles = StyleSheet.create({
  detail: {
    flex: 1,
    backgroundColor: '#fff',
  },
  back: {
    height: 50,
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    paddingTop: 20,
    paddingLeft: 20,
  },
  color: {
    flex: .6,
    marginLeft: 15,
    marginRight: 15,
  },
  text:{
    flex: .4,
    fontSize: 80,
    color: '#000',
    textAlign:'center',
    fontWeight: 'bold',
  },
});