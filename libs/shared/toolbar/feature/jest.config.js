module.exports = {
  name: 'shared-toolbar-feature',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/shared/toolbar/feature',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
