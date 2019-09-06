module.exports = {
  name: 'shared-profile-ui',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/shared/profile/ui',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
