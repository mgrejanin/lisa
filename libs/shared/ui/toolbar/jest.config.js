module.exports = {
  name: 'shared-ui-toolbar',
  preset: '../../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/shared/ui/toolbar',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
