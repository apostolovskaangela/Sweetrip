module.exports = {
  preset: 'jest-expo',
  testMatch: ['**/tests/integration/**/*.test.{js,ts,tsx}'],
  transformIgnorePatterns: [
    'node_modules/(?!@react-native|react-native|@react-native-async-storage)'
  ],
};
