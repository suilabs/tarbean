import fs from 'fs';
import path from 'path';

import server from '../../src/server';

const testImage1 = path.join(filesSourceDir, 'testfile1.jpg');
// console.log = () => {};
let app;

const checkStatusCode = (done, statusCode, withFile=true) => {
  check((err, res) => {
    expect(res).to.have.status(statusCode);
    done();
  }, withFile);
};

const check = (callback, withFile=true) => {
  const req = request(app).post('/images/test');
  withFile && req.attach('data', fs.readFileSync(testImage1), 'testfile1.jpg');
  req.end(callback);
};

describe('Upload Files', () => {

  afterEach(() => {
    cleanUpload();
    app.close();
  });

  it('should upload file', (done) => {
    app = server({
      basePath: uploadSourceDir
    });
    checkStatusCode(done, 200);
  });

  it('should not allow files over limit', (done) => {
    app = server({
      basePath: uploadSourceDir,
      fileSize: 1
    });
    checkStatusCode(done, 413);
  });

  it('should return 400 when no files uploaded', (done) => {
    app = server({});
    checkStatusCode(done, 400, false);
  });

  it('should return 500 is theres an error when saving the file', (done) => {
    app = server({
      basePath: "/non/existing/path"
    });
    checkStatusCode(done, 500);
  });
  
  it('should upload file in the specified path', (done) => {
    let basePath = "/tmp";
    app = server({
      basePath
    });
    check((err, res) => {
      expect(res).to.have.status(200);
      fs.access("/tmp/public/images/test", fs.constants.R_OK, (err) => {
        expect(err).to.be.a('null');
        done();
      })
    }, true);
  })
});