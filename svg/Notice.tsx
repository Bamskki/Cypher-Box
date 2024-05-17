import * as React from 'react';
import Svg, { SvgProps, Path, Defs, Pattern, Use, Image } from 'react-native-svg';
const Notice = (props: SvgProps) => (
  <Svg width={17} height={18} fill="none" {...props}>
    <Path fill="url(#a)" d="M0 0h17v18H0z" transform="matrix(-1 0 0 1 17 0)" />
    <Defs>
      <Pattern id="a" width={1} height={1} patternContentUnits="objectBoundingBox">
        <Use xlinkHref="#b" transform="matrix(.00346 0 0 .00327 -.009 0)" />
      </Pattern>
      <Image
        xlinkHref="data:image/png;base64,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"
        id="b"
        width={294}
        height={306}
      />
    </Defs>
  </Svg>
);
export default Notice;
