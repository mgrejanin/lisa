module.exports = {
  name: 'shared-chat',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/shared/chat',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
