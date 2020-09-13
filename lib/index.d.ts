import React from 'react';
import { ViewStyle, StyleProp, View, LayoutChangeEvent } from 'react-native';
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
    static defaultProps: Partial<AnimatedExpandableViewProps>;
    animatableViewRef: React.RefObject<Animatable.View & View>;
    contentViewRef: React.RefObject<View>;
    contentHeight?: number;
    visible: boolean;
    state: {
        measured: boolean;
    };
    toggle: (visible?: boolean | undefined) => void;
    onLayoutContent: (event: LayoutChangeEvent) => void;
    render(): JSX.Element;
}
