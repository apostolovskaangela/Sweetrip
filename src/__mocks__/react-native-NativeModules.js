// Minimal mock for react-native NativeModules used by jest-expo setup
module.exports = {
  Linking: {},
  UIManager: {},
  ImageLoader: {},
  ImageViewManager: {},
  NativeUnimoduleProxy: {
    viewManagersMetadata: {},
  },
  // Provide placeholder Linking and other modules if accessed
  LinkingManager: {},
};
