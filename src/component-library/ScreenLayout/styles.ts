// *** React Import
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

// *** Custom component
import { colors } from '@Cypher/style-guide';

interface Styles {
  main: ViewStyle;
  inner: ViewStyle;
  headerRight: ViewStyle;
  headertext: ViewStyle;
  icon: ViewStyle;
  arrow: ViewStyle;
  headerTitle: ViewStyle;
  scrollView: ViewStyle;
  removePadding: ViewStyle;
  headerImageView: ViewStyle;
  showToolbar: ViewStyle;
  backBtnStyle: ViewStyle;
  deleteBtnStyle: ViewStyle;
  imageViewStyle: ImageStyle;
  inputStyle: ViewStyle;
  delete: ViewStyle;
  dateStyle: ViewStyle;
  timeStyle: ViewStyle;
  titleStyle: ViewStyle;
  menuStyle: ViewStyle;
  deleteStyle: ImageStyle;
  titleViewStyle: ViewStyle;
  titleStyle_: ViewStyle;
  imageContainer: ViewStyle;
  imageView: ViewStyle;
  closeView: ViewStyle;
  closeImage: ImageStyle;
}

const styles = StyleSheet.create<Styles>({
  main: {
    flexGrow: 1,
  },
  inner: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  headerRight: {
    flexDirection: 'row',
  },
  headertext: {},
  arrow: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 65,
  },
  headerTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '3%',
  },
  scrollView: {
    flexGrow: 1,
  },
  removePadding: {
    paddingHorizontal: 0,
  },
  headerImageView: {
    alignItems: 'center',
    marginLeft: '3%',
  },
  showToolbar: {
    margin: 16,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    zIndex: 1
  },
  icon: {
    width: 35,
    height: 35,
    position: 'absolute',
    left: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  delete: {
    width: 30,
    height: 30,
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: colors.white,
    shadowColor: colors.shadow25,
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 3,
    margin: 10,
  },
  backBtnStyle: {
    width: 15,
    height: 15,
  },
  deleteBtnStyle: {
    width: 20,
    height: 20,
  },
  imageViewStyle: {
    tintColor: colors.black.light,
    transform: [{ rotate: '180deg' }],
  },
  inputStyle: {
    color: colors.black.light,
  },
  dateStyle: {
    flex: 1,
  },
  timeStyle: {},
  titleStyle: {
    flexDirection: 'row',
    marginStart: 40,
  },
  deleteStyle: {
    width: 20,
    height: 20,
  },
  menuStyle: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleViewStyle: {
    marginHorizontal: 40,
  },
  titleStyle_: {
    textAlign: 'center',
  },
  imageContainer: {
    width: 20,
    height: 20,
  },
  imageView: {
    width: 17.5,
    height: 17.5,
  },
  closeView: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    top: -20,
    right: 10,
  },
  closeImage: {
    width: 20,
    height: 20,
  }
});

export default styles;
