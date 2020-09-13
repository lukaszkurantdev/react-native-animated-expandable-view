import React from 'react';
import { ViewStyle, StyleProp, LayoutAnimationTypes } from 'react-native';
declare type Easing = keyof LayoutAnimationTypes;
export interface AnimatedExpandableViewProps {
  visible: boolean;
  duration: number;
  delay?: number;
  easing?: Easing;
  style?: StyleProp<ViewStyle>;
  onAnimationEnd?: () => void;
}
export default class AnimatedExpandableView extends React.Component<AnimatedExpandableViewProps> {
  static defaultProps: Partial<AnimatedExpandableViewProps>;
  UNSAFE_componentWillReceiveProps(nextProps: AnimatedExpandableViewProps): void;
  render(): JSX.Element;
}
export {};
