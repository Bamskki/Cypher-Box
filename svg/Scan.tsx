import * as React from 'react';
import Svg, { Path, Defs, Pattern, Use, Image, SvgProps } from 'react-native-svg';
const Scan = (props: React.JSX.IntrinsicAttributes & React.JSX.IntrinsicClassAttributes<Svg> & Pick<Readonly<SvgProps>, "width" | "height" | "viewBox" | "color" | "title" | "children" | "opacity" | "fill" | "fillOpacity" | "fillRule" | "stroke" | "strokeWidth" | "strokeOpacity" | "strokeDasharray" | "strokeDashoffset" | "strokeLinecap" | "strokeLinejoin" | "strokeMiterlimit" | "vectorEffect" | "clipRule" | "clipPath" | "translate" | "translateX" | "translateY" | "origin" | "originX" | "originY" | "scale" | "scaleX" | "scaleY" | "skew" | "skewX" | "skewY" | "rotation" | "x" | "y" | "transform" | "pointerEvents" | "onStartShouldSetResponder" | "onMoveShouldSetResponder" | "onResponderEnd" | "onResponderGrant" | "onResponderReject" | "onResponderMove" | "onResponderRelease" | "onResponderStart" | "onResponderTerminationRequest" | "onResponderTerminate" | "onStartShouldSetResponderCapture" | "onMoveShouldSetResponderCapture" | "disabled" | "onPress" | "onPressIn" | "onPressOut" | "onLongPress" | "delayPressIn" | "delayPressOut" | "delayLongPress" | "id" | "marker" | "markerStart" | "markerMid" | "markerEnd" | "mask" | "onLayout" | "accessibilityLabel" | "accessible" | "testID" | "font" | "fontStyle" | "fontVariant" | "fontWeight" | "fontStretch" | "fontSize" | "fontFamily" | "textAnchor" | "textDecoration" | "letterSpacing" | "wordSpacing" | "kerning" | "fontFeatureSettings" | "fontVariantLigatures" | "fontVariationSettings" | "hitSlop" | "removeClippedSubviews" | "style" | "nativeID" | "collapsable" | "needsOffscreenAlphaCompositing" | "renderToHardwareTextureAndroid" | "focusable" | "shouldRasterizeIOS" | "isTVSelectable" | "hasTVPreferredFocus" | "tvParallaxProperties" | "tvParallaxShiftDistanceX" | "tvParallaxShiftDistanceY" | "tvParallaxTiltAngle" | "tvParallaxMagnification" | "onTouchStart" | "onTouchMove" | "onTouchEnd" | "onTouchCancel" | "onTouchEndCapture" | "onPointerEnter" | "onPointerEnterCapture" | "onPointerLeave" | "onPointerLeaveCapture" | "onPointerMove" | "onPointerMoveCapture" | "onPointerCancel" | "onPointerCancelCapture" | "onPointerDown" | "onPointerDownCapture" | "onPointerUp" | "onPointerUpCapture" | "accessibilityActions" | "aria-label" | "accessibilityRole" | "accessibilityState" | "aria-busy" | "aria-checked" | "aria-disabled" | "aria-expanded" | "aria-selected" | "aria-labelledby" | "accessibilityHint" | "accessibilityValue" | "aria-valuemax" | "aria-valuemin" | "aria-valuenow" | "aria-valuetext" | "onAccessibilityAction" | "importantForAccessibility" | "aria-hidden" | "aria-live" | "aria-modal" | "role" | "accessibilityLiveRegion" | "accessibilityLabelledBy" | "accessibilityElementsHidden" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors" | "accessibilityLanguage"> & { readonly preserveAspectRatio?: string | undefined; } & {}) => (
    <Svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={96} height={91} fill="none" {...props}>
        <Path fill="url(#a)" d="M0 0h96v91H0z" />
        <Defs>
            <Pattern id="a" width={1} height={1} patternContentUnits="objectBoundingBox">
                <Use xlinkHref="#b" transform="matrix(.00195 0 0 .00206 0 -.027)" />
            </Pattern>
            <Image
                xlinkHref="data:image/png;base64,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"
                id="b"
                width={512}
                height={512}
            />
        </Defs>
    </Svg>
);
export default Scan;
