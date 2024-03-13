import screenWidth from './screenWidth';

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

export default isNarrowDevice
  ? narrowDeviceTextSizes
  : defaultTextSizes;
