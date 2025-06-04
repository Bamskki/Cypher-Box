import React from 'react';
import { Image, ImageSourcePropType, View, StyleSheet } from 'react-native';
import Svg, { Circle, ClipPath, Defs, G, LinearGradient, Rect, Stop } from 'react-native-svg';
import { Text } from '@Cypher/component-library';
import styles from './styles';
import { colors } from '@Cypher/style-guide';

type CircleTimerProps = {
  backgroundColor?: string;
  progress?: number; // out of 133
  size?: number;
  strokeWidth?: number;
  value?: string;
  convertedValue?: string;
  image?: ImageSourcePropType;
};

const COLORS = {
  progress: colors.pink.progress,
  background: colors.gray.bg,
};

const ROTATION_DEG = -225;
const MAX_PROGRESS = 133;

const CircleTimer = ({
  size = 100,
  strokeWidth = 10,
  progress = 100,
  value,
  convertedValue,
  image,
}: CircleTimerProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedProgress = Math.min(progress, MAX_PROGRESS) / MAX_PROGRESS;
  const strokeDashoffset = circumference * (1 - clampedProgress);

  // Calculate the angle for the progress
  // The arc spans 270 degrees (from -225° to 45°), so we map the progress to this range
  const totalArcAngle = 270; // Total angle of the arc (from -225° to 45°)
  const startAngle = ROTATION_DEG; // Starting angle is -225°
  const progressAngleDeg = startAngle + (clampedProgress * totalArcAngle); // Progress angle in degrees
  const progressAngleRad = progressAngleDeg * (Math.PI / 180); // Convert to radians

  // Calculate the position of the end of the progress arc
  const centerX = size / 2;
  const centerY = size / 2;
  const endX = centerX + radius * Math.cos(progressAngleRad);
  const endY = centerY + radius * Math.sin(progressAngleRad);

  // Size of the square marker
  const markerSize = strokeWidth / 2;

  return (
    <View style={[styles.container, { width: size, height: size / 2 }]}>
      <Svg height={size} width={size}>
        <Defs>
          <LinearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor={colors.pink.progress} />
            <Stop offset="100%" stopColor={colors.pink.stop} />
          </LinearGradient>
        </Defs>

        <G rotation={ROTATION_DEG} origin={`${size / 2}, ${size / 2}`}>
          {/* Background Arc */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={COLORS.background}
            strokeWidth={strokeWidth}
            strokeDasharray={0.75 * circumference}
            strokeDashoffset={0}
            strokeLinecap="round"
          />

          {/* Progress Arc with Gradient */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />

          {/* White square marker at the end of the progress arc */}
          <G rotation={-ROTATION_DEG} origin={`${size / 2}, ${size / 2}`}>
            <Circle
              cx={endX - markerSize / 2} // Adjust for Rect's top-left anchoring
              cy={endY - markerSize / 2}
              r={strokeWidth / 2}
              fill="white"
            />
          </G>
        </G>
      </Svg>

      <View style={styles.textContainer}>
        <Text bold style={styles.mainText}>{value}</Text>
        <Text h3 semibold>{convertedValue}</Text>
      </View>

      {image && (
        <Image
          source={image}
          resizeMode="contain"
          style={styles.image}
        />
      )}
    </View>
  );
};

export default CircleTimer;
// import React from 'react';
// import { Image, ImageSourcePropType, View, StyleSheet } from 'react-native';
// import Svg, { Circle, ClipPath, Defs, G, LinearGradient, Rect, Stop } from 'react-native-svg';
// import { Text } from '@Cypher/component-library';
// import styles from './styles';
// import { colors } from '@Cypher/style-guide';

// type CircleTimerProps = {
//   backgroundColor?: string;
//   progress?: number; // out of 133
//   size?: number;
//   strokeWidth?: number;
//   value?: string;
//   convertedValue?: string;
//   image?: ImageSourcePropType;
// };

// const COLORS = {
//   progress: colors.pink.progress,
//   background: colors.gray.bg,
// };

// const ROTATION_DEG = -225;
// const MAX_PROGRESS = 133;

// const CircleTimer = ({
//   size = 100,
//   strokeWidth = 10,
//   progress = 100,
//   value,
//   convertedValue,
//   image,
// }: CircleTimerProps) => {
//   const radius = (size - strokeWidth) / 2;
//   const circumference = 2 * Math.PI * radius;
//   const clampedProgress = Math.min(progress, MAX_PROGRESS) / MAX_PROGRESS;
//   const strokeDashoffset = circumference * (1 - clampedProgress);

//   // Calculate the angle of the progress arc in radians
//   // const progressAngle = (clampedProgress * 270 - 135) * (Math.PI / 180); // 270 is the total angle of the arc, -135 is the starting angle
//   const progressAngle = (clampedProgress * 270) * (Math.PI / 180); // 270 is the total angle of the arc, -135 is the starting angle
//   const centerX = size / 2;
//   const centerY = size / 2;
//   // Calculate the x, y position of the end of the progress arc
//   const endX = centerX + radius * Math.cos(progressAngle);
//   const endY = centerY + radius * Math.sin(progressAngle);

//   const markerSize = strokeWidth; // Match the stroke width for consistency

//   return (
//     <View style={[styles.container, { width: size, height: size / 2 }]}>
//       <Svg height={size} width={size}>
//         <Defs>
//           <LinearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
//             <Stop offset="0%" stopColor={colors.pink.progress} />
//             <Stop offset="100%" stopColor={colors.pink.stop} />
//           </LinearGradient>
//         </Defs>

//         <G rotation={ROTATION_DEG} origin={`${size / 2}, ${size / 2}`}>
//           {/* Background Arc */}
//           <Circle
//             cx={size / 2}
//             cy={size / 2}
//             r={radius}
//             fill="none"
//             stroke={COLORS.background}
//             strokeWidth={strokeWidth}
//             strokeDasharray={0.75 * circumference}
//             strokeDashoffset={0}
//             strokeLinecap="round"
//           />

//           {/* Progress Arc with Gradient */}
//           <Circle
//             cx={size / 2}
//             cy={size / 2}
//             r={radius}
//             fill="none"
//             stroke="url(#progressGradient)"
//             strokeWidth={strokeWidth}
//             strokeDasharray={circumference}
//             strokeDashoffset={strokeDashoffset}
//             strokeLinecap="round"
//           />

//           {/* White dot at the end of the progress arc */}
//           {/* <Circle
//             cx={endX}
//             cy={endY}
//             r={strokeWidth / 2} // Size of the dot, matching the stroke width
//             fill="white"
//           /> */}
//           {/* <Rect
//             x={endX - markerSize / 2} // Adjust for narrower width
//             y={endY - markerSize / 4}
//             width={markerSize} // Narrower width for a line-like look
//             height={markerSize / 2}
//             fill="white"
//           /> */}
//           <Rect
//             // x={endX - 3} // Adjust for narrower width
//             x={endX} // Adjust for narrower width
//             y={endY}
//             width={6} // Narrower width for a line-like look
//             height={5}
//             fill="white"
//           />
//         </G>
//       </Svg>

//       <View style={styles.textContainer}>
//         <Text bold style={styles.mainText}>{value}</Text>
//         <Text h3 semibold>{convertedValue}</Text>
//       </View>

//       {image && (
//         <Image
//           source={image}
//           resizeMode="contain"
//           style={styles.image}
//         />
//       )}
//     </View>
//   );
// };

// export default CircleTimer;