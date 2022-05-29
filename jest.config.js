module.exports = {
  preset: 'ts-jest/presets/default-esm',
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
    'vue',
  ],
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.(js|ts)$': 'ts-jest',
  },
  testEnvironment: 'node',
  clearMocks: true,
  // collectCoverage: true,
  // coverageDirectory: 'coverage',
};
