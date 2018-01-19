import fs from 'fs';
import path from 'path';

import Utils from '../../src/utils';

const testImage1 = path.join(filesSourceDir, 'testfile1.jpg');

const fileMove = (file) => {
  return {
    data: file,
    mv: (_, callback) => {
      callback()
    }
  }
};

describe('Utils', () => {
  it('should create a folder', () => {
    const folder = `/tmp/test-${Math.random()}`;
    Utils.createDir(folder);
    expect(folder).to.be.a.directory();
  });

  it('should create a folder recursively', () => {
    const folder = `/tmp/test-${Math.random()}/alsoThis`;
    Utils.createDir(folder);
    expect(folder).to.be.a.directory();
  });

  it('should save a file in a folder', (done) => {
    const folder = `/tmp/test-${Math.random()}`;
    Utils.createDir(folder);
    Utils.saveFile(folder, 'test', 'testfile.jpg', fileMove(fs.readFileSync(testImage1)))
      .then(() => done())
      .catch((err) => {
        expect(err).to.be.null();
        done();
      });
  });

  it('should fail when saving to a non existent folder', (done) => {
    const folder = `/tmp/test-${Math.random()}`;
    Utils.saveFile(folder, 'test', 'testfile.jpg', fileMove(fs.readFileSync(testImage1)))
      .then((res) => {
        expect(res).to.be.null();
        done();
      })
      .catch(() => done());
  });
});