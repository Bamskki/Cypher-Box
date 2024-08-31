import { ThemeSpacing } from "@Cypher/constants/types";

import screenWidth from "./screenWidth";

const isNarrowDevice = screenWidth < 320;

const narrowDeviceTextSizes = {
  headline: 44,
  h1: 36,
  h2: 16,
  h3: 13,
  h4: 11,
  header: 30,
  subHeader: 18,
  default: 10,
};

const defaultTextSizes = {
  headline: 50,
  h1: 40,
  h2: 20,
  h3: 16,
  h4: 14,
  header: 34,
  subHeader: 22,
  default: 12,
};

const SIZES: any = {
  // global sizes
  base: 8,
  text: 14,
  radius: 4,
  padding: 20,
  // button sizes
  buttonBorder: 1,
  buttonBorder2: 2,
  buttonBorder3: 2,
  buttonRadius: 8,
  socialSize: 64,
  socialRadius: 16,
  socialIconSize: 26,

  // button shadow
  shadowOffsetWidth: 0,
  shadowOffsetHeight: 7,
  shadowOpacity: 0.07,
  shadowRadius: 4,
  elevation: 2,

  // input sizes
  inputHeight: 46,
  inputBorder: 1,
  inputRadius: 8,
  inputPadding: 12,

  // card sizes
  cardRadius: 16,
  cardPadding: 10,

  // image sizes
  imageRadius: 14,
  avatarSize: 32,
  avatarRadius: 8,

  // switch sizes
  switchWidth: 50,
  switchHeight: 24,
  switchThumb: 20,

  // checkbox sizes
  checkboxWidth: 18,
  checkboxHeight: 18,
  checkboxRadius: 5,
  checkboxIconWidth: 10,
  checkboxIconHeight: 8,

  // product link size
  linkSize: 12,

  /** font size multiplier: for maxFontSizeMultiplier prop */
  multiplier: 2,
};

const SPACING: ThemeSpacing = {
  /** xs: 4px */
  xs: SIZES.base * 0.5,
  /** s: 8px */
  s: SIZES.base * 1,
  /** sm: 16px */
  sm: SIZES.base * 2,
  /** m: 24px */
  m: SIZES.base * 3,
  /** md: 32px */
  md: SIZES.base * 4,
  /** l: 40px */
  l: SIZES.base * 5,
  /** xl: 48px */
  xl: SIZES.base * 6,
  /** xxl: 56px */
  xxl: SIZES.base * 7,
};

const textSize = isNarrowDevice ? narrowDeviceTextSizes : defaultTextSizes;

export default { ...SIZES, ...SPACING, ...textSize };
