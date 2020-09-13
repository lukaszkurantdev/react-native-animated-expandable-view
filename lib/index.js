import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
export default class AnimatedExpandableView extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.animatableViewRef = React.createRef();
        this.contentViewRef = React.createRef();
        this.visible = false;
        this.state = {
            measured: false,
        };
        this.toggle = (visible) => {
            const ref = this.animatableViewRef.current;
            const { duration, delay, easing } = this.props;
            const { measured } = this.state;
            setTimeout(() => {
                if (ref && measured && visible !== this.visible) {
                    if (this.visible) {
                        ref.transitionTo({ height: 0 }, duration, easing);
                    }
                    else {
                        ref.transitionTo({ height: this.contentHeight }, duration, easing);
                    }
                    this.visible = !this.visible;
                }
            }, delay);
        };
        this.onLayoutContent = (event) => {
            const { height } = event.nativeEvent.layout;
            if (!this.state.measured) {
                this.contentHeight = height;
                this.setState({ measured: true });
            }
        };
    }
    render() {
        const { style, onAnimationBegin, onAnimationEnd } = this.props;
        const { measured } = this.state;
        return (<Animatable.View ref={this.animatableViewRef} style={[style, styles.container, measured && styles.measuredContainer]} onAnimationBegin={onAnimationBegin} onAnimationEnd={onAnimationEnd}>
        <View onLayout={this.onLayoutContent} style={!measured && styles.beforeMeasuredContent}>
          {this.props.children}
        </View>
      </Animatable.View>);
    }
}
AnimatedExpandableView.defaultProps = {
    duration: 400,
    delay: 0,
};
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
