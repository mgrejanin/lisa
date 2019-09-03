module.exports = {
  name: 'shared-chat-data-access',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/shared/chat/data-access',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
