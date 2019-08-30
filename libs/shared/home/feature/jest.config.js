module.exports = {
  name: 'shared-home-feature',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/shared/home/feature',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
