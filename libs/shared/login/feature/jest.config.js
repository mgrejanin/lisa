module.exports = {
  name: 'shared-login-feature',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/shared/login/feature',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
