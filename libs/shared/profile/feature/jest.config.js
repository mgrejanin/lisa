module.exports = {
  name: 'shared-profile-feature',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/shared/profile/feature',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
