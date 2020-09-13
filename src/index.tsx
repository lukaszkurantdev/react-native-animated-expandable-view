import React from 'react';
import { ViewStyle, StyleProp, View, UIManager, Platform, LayoutAnimation, LayoutAnimationTypes } from 'react-native';

type Easing = keyof LayoutAnimationTypes;

export interface AnimatedExpandableViewProps {
  visible: boolean;
  duration: number;
  delay?: number;
  easing?: Easing;
  style?: StyleProp<ViewStyle>;
  onAnimationEnd?: () => void;
}

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class AnimatedExpandableView extends React.Component<AnimatedExpandableViewProps> {
  static defaultProps: Partial<AnimatedExpandableViewProps> = {
    duration: 100,
    delay: 0,
    easing: 'linear',
    onAnimationEnd: () => null,
  };

  UNSAFE_componentWillReceiveProps(nextProps: AnimatedExpandableViewProps) {
    const { easing, duration, delay, onAnimationEnd } = nextProps;
    const layoutObj = { delay, type: easing, property: 'scaleY' };

    LayoutAnimation.configureNext(
      {
        duration,
        update: layoutObj,
        create: layoutObj,
        delete: layoutObj,
      },
      onAnimationEnd,
    );
  }

  render() {
    const { style, visible, children } = this.props;
    return <>{visible && <View style={[style]}>{children}</View>}</>;
  }
}
