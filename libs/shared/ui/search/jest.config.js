module.exports = {
  name: 'shared-ui-search',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/shared/ui/search',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
