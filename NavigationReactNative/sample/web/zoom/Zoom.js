import React from 'react';
import NavigationMotion from '../NavigationMotion';
import ZoomShared from './ZoomShared';

export default ({stateNavigator}) => (
  <NavigationMotion
    startStateKey="grid"
    unmountedStyle={{opacity: 0}}
    mountedStyle={{opacity: 1}}
    crumbStyle={{opacity: 0}}
    style={{flex: 1}}
    sharedElementMotion={props => <ZoomShared {...props} />}
    stateNavigator={stateNavigator}>
    {({opacity}, scene, url) => (
      <div key={url}
        style={{
          position: 'absolute',
          opacity
        }}>
        {scene}
      </div>
    )}
  </NavigationMotion>
);
