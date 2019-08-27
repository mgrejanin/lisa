module.exports = {
  name: 'lisa',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/lisa',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
