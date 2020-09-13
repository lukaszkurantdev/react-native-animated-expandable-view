import React from 'react';
import { View, UIManager, Platform, LayoutAnimation } from 'react-native';
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
export default class AnimatedExpandableView extends React.Component {
  UNSAFE_componentWillReceiveProps(nextProps) {
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
AnimatedExpandableView.defaultProps = {
  duration: 100,
  delay: 0,
  easing: 'linear',
  onAnimationEnd: () => null,
};
