module.exports = {
  name: 'shared-home-ui',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/shared/home/ui',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
