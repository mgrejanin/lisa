module.exports = {
  name: 'shared-login-data-access',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/shared/login/data-access',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
