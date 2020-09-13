import React from 'react';
import { ViewStyle, StyleProp, View, LayoutChangeEvent, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

export interface AnimatedExpandableViewProps {
  visible: boolean;
  duration?: number;
  delay?: number;
  easing?: Animatable.Easing;
  style?: StyleProp<ViewStyle>;
  onAnimationBegin?: () => void;
  onAnimationEnd?: () => void;
}

export default class AnimatedExpandableView extends React.PureComponent<AnimatedExpandableViewProps> {
  static defaultProps: Partial<AnimatedExpandableViewProps> = {
    duration: 400,
    delay: 0,
  };

  animatableViewRef = React.createRef<Animatable.View & View>();
  contentViewRef = React.createRef<View>();
  contentHeight?: number;
  visible: boolean = false;

  state = {
    measured: false,
  };

  toggle = (visible?: boolean) => {
    const ref = this.animatableViewRef.current;
    const { duration, delay, easing } = this.props;
    const { measured } = this.state;

    setTimeout(() => {
      if (ref && measured && visible !== this.visible) {
        if (this.visible) {
          ref.transitionTo({ height: 0 }, duration, easing);
        } else {
          ref.transitionTo({ height: this.contentHeight }, duration, easing);
        }

        this.visible = !this.visible;
      }
    }, delay);
  };

  onLayoutContent = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;

    if (!this.state.measured) {
      this.contentHeight = height;
      this.setState({ measured: true });
    }
  };

  render() {
    const { style, onAnimationBegin, onAnimationEnd } = this.props;
    const { measured } = this.state;

    return (
      <Animatable.View
        ref={this.animatableViewRef}
        style={[style, styles.container, measured && styles.measuredContainer]}
        onAnimationBegin={onAnimationBegin}
        onAnimationEnd={onAnimationEnd}
      >
        <View onLayout={this.onLayoutContent} style={!measured && styles.beforeMeasuredContent}>
          {this.props.children}
        </View>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  measuredContainer: {
    height: 0,
  },
  beforeMeasuredContent: {
    position: 'absolute',
    top: 0,
    opacity: 0,
  },
});
