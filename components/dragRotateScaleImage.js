import React, { Component, useState } from 'react';
import { Animated, StyleSheet, View, Image } from 'react-native';

import {
  PanGestureHandler,
  PinchGestureHandler,
  RotationGestureHandler,
  State,
} from 'react-native-gesture-handler';

export class DragRotateScaleImage extends Component {

    panRef = React.createRef();
    pinchRef = React.createRef();
    rotationRef = React.createRef();
    
  constructor(props) {
    super(props);

    console.log("constructing: " + JSON.stringify(props.attributes.transform))
    this._image = props.attributes.image
    this._scaleX = props.attributes.transform.scaleX
    
    
    /* Panning */
    this._translateX = new Animated.Value(0);
    this._translateY = new Animated.Value(0);
    this._translateX.setOffset(props.attributes.transform.offset.x);
    this._translateY.setOffset(props.attributes.transform.offset.y);
    this._lastOffset = props.attributes.transform.offset;
    this._onPanGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationX: this._translateX,
            translationY: this._translateY,
          },
        },
      ],
      { useNativeDriver: true }
    );

    /* Pinching */
    this._baseScale = new Animated.Value(props.attributes.transform.scale);
    this._pinchScale = new Animated.Value(1);
    this._scale = Animated.multiply(this._baseScale, this._pinchScale);
    this._lastScale = props.attributes.transform.scale;
    this._onPinchGestureEvent = Animated.event(
      [{ nativeEvent: { scale: this._pinchScale } }],
      { useNativeDriver: true }
    );
    /* Rotation */
    this._rotate = new Animated.Value(0);
    this._rotate.setOffset(props.attributes.transform.rotate);
    this._offsetRotate = Animated.multiply(this._rotate,this._scaleX);

    this._rotateStr = this._offsetRotate.interpolate({
      inputRange: [-100, 100],
      outputRange: ['-100rad', '100rad'],
    });
    this._lastRotate = props.attributes.transform.rotate;
    this._onRotateGestureEvent = Animated.event(
      [{ nativeEvent: { rotation: this._rotate } }],
      { useNativeDriver: true }
    );


  }
  _onPanHandlerStateChange = event => {

    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastOffset.x += event.nativeEvent.translationX;
      this._lastOffset.y += event.nativeEvent.translationY;
      this._translateX.setOffset(this._lastOffset.x);
      this._translateX.setValue(0);
      this._translateY.setOffset(this._lastOffset.y);
      this._translateY.setValue(0);

      //console.log("pan going out: " + this._lastRotate)
      this.props.onEnd({
          offset: this._lastOffset,
          scale: this._lastScale,
          scaleX: this._scaleX,
          rotate: this._lastRotate
        });
    }

  };
  _onPinchHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastScale *= event.nativeEvent.scale;
      this._baseScale.setValue(this._lastScale);
      this._pinchScale.setValue(1);

      //console.log("scale going out: " + this._lastRotate)
      this.props.onEnd({
        offset: this._lastOffset,
        scale: this._lastScale,
        scaleX: this._scaleX,
        rotate: this._lastRotate
      });
    }
  };
  _onRotateHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastRotate += event.nativeEvent.rotation;
      this._rotate.setOffset(this._lastRotate);
      this._rotate.setValue(0);

      //console.log("rotate going out: " + this._lastRotate)
      this.props.onEnd({
        offset: this._lastOffset,
        scale: this._lastScale,
        scaleX: this._scaleX,
        rotate: this._lastRotate
      });
    }
  };
  
  render() {

    return (

      <PanGestureHandler
        ref={this.panRef}
        {...this.props}
        onGestureEvent={this._onPanGestureEvent}
        onHandlerStateChange={this._onPanHandlerStateChange}>
        <Animated.View style={{flex: 1}}>
            <RotationGestureHandler
                ref={this.rotationRef}
                simultaneousHandlers={[this.panRef, this.pinchRef]}
                onGestureEvent={this._onRotateGestureEvent}
                onHandlerStateChange={this._onRotateHandlerStateChange}>
                    <Animated.View style={{flex: 1}}>
                        <PinchGestureHandler
                            ref={this.pinchRef}
                            simultaneousHandlers={[this.rotationRef, this.panRef]}
                            onGestureEvent={this._onPinchGestureEvent}
                            onHandlerStateChange={this._onPinchHandlerStateChange}>
                            <Animated.View style={{
                              flex:1
                            }}>
                                <Animated.Image
                                    style={[
                                        styles.box,
                                            {
                                                transform: [
                                                { translateX: this._translateX },
                                                { translateY: this._translateY },
                                                { scale: this._scale },
                                                { scaleX: this._scaleX},
                                                { rotate: this._rotateStr }
                                                ]
                                            },
                                            this.props.boxStyle,
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

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  box: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    backgroundColor: '#ffffff7f',
    borderWidth: 2,
    borderColor: "#74f0fc",

    zIndex: 200,
    position: "absolute"
  },
});