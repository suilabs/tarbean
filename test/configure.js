import chai from 'chai';
import http from 'chai-http';
import chaiFs from 'chai-fs';
import {exec} from 'child_process';

chai.use(http);
chai.use(chaiFs);
chai.should();
global.expect = chai.expect;
global.chai = chai;
global.request = chai.request;
global.filesSourceDir = `${__dirname}/files`;
global.uploadSourceDir = `${__dirname}/uploadFiles`;
global.cleanUpload = () => {
  exec(`rm -rf ${uploadSourceDir}/*}`);
};
