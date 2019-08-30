module.exports = {
  name: 'shared-ui-thumbnail-carroussel',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/shared/ui/thumbnail-carroussel',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
