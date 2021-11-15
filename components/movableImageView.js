import React from 'react';
import { Animated, StyleSheet } from 'react-native';

import {
  PanGestureHandler,
  PinchGestureHandler,
  RotationGestureHandler,
  State,
} from 'react-native-gesture-handler';

USE_NATIVE_DRIVER = false;

export class MovableImageView extends React.Component {
  panRef = React.createRef();
  rotationRef = React.createRef();
  pinchRef = React.createRef();
  constructor(props) {
    super(props);

    this._image = require('../assets/pyramid.png');

    /* Pinching */
    this._baseScale = new Animated.Value(1);
    this._pinchScale = new Animated.Value(1);
    this._scale = Animated.multiply(this._baseScale, this._pinchScale);
    this._lastScale = 1;
    this._onPinchGestureEvent = Animated.event(
      [{ nativeEvent: { scale: this._pinchScale } }],
      { useNativeDriver: USE_NATIVE_DRIVER }
    );

    /* Rotation */
    this._rotate = new Animated.Value(0);
    this._rotateStr = this._rotate.interpolate({
      inputRange: [-100, 100],
      outputRange: ['-100rad', '100rad'],
    });
    this._lastRotate = 0;
    this._onRotateGestureEvent = Animated.event(
      [{ nativeEvent: { rotation: this._rotate } }],
      { useNativeDriver: USE_NATIVE_DRIVER }
    );

    /* Pan */
    this._translateX = new Animated.Value(0);
    this._translateY = new Animated.Value(0);
    this._lastOffset = { x: 0, y: 0 };
    this._onPanGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationX: this._translateX,
            translationY: this._translateY,
          },
        },
      ],
      { useNativeDriver: USE_NATIVE_DRIVER }
    );
  }

  _onRotateHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastRotate += event.nativeEvent.rotation;
      this._rotate.setOffset(this._lastRotate);
      this._rotate.setValue(0);
    }
  };
  _onPinchHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastScale *= event.nativeEvent.scale;
      this._baseScale.setValue(this._lastScale);
      this._pinchScale.setValue(1);
    }
  };
  _onPanGestureStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
        this._lastOffset.x += event.nativeEvent.translationX;
        this._lastOffset.y += event.nativeEvent.translationY;
        this._translateX.setOffset(this._lastOffset.x);
        this._translateX.setValue(0);
        this._translateY.setOffset(this._lastOffset.y);
        this._translateY.setValue(0);

        this.props.onEnd({
            rotate: this._lastOffset
          });
      }
  };
  render() {
    return (
      <PanGestureHandler
        ref={this.panRef}
        onGestureEvent={this._onPanGestureEvent}
        onHandlerStateChange={this._onPanGestureStateChange}
        >
        <Animated.View style={[styles.wrapper,{position: "absolute"}]}>
          <RotationGestureHandler
            ref={this.rotationRef}
            simultaneousHandlers={this.pinchRef}
            onGestureEvent={this._onRotateGestureEvent}
            onHandlerStateChange={this._onRotateHandlerStateChange}>
            <Animated.View style={styles.wrapper}>
              <PinchGestureHandler
                ref={this.pinchRef}
                simultaneousHandlers={this.rotationRef}
                onGestureEvent={this._onPinchGestureEvent}
                onHandlerStateChange={this._onPinchHandlerStateChange}>
                <Animated.View style={styles.wrapper}>
                  <Animated.Image
                    style={[
                      styles.box_selected,
                      {
                        transform: [
                          { perspective: 200 },
                          { scale: this._scale },
                          { rotate: this._rotateStr },
                          { translateX: this._translateX },
                          { translateY: this._translateY }
                        ],
                      },
                    ]}
                    source={this._image}
                  />
                </Animated.View>
              </PinchGestureHandler>
            </Animated.View>
          </RotationGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    );
  }
}

export default MovableImageView;

const styles = StyleSheet.create({
    box: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        margin: 10,
        zIndex: 200,
        position: "absolute"
      },
      box_selected: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        backgroundColor: '#ffffff7f',
        borderWidth: 2,
        borderColor: "#74f0fc",
        margin: 10,
        zIndex: 200,
        position: "absolute"
      },
      wrapper: {
          flex: 1
      }
});