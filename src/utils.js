const fs = require('fs');
const nodefs = require('node-fs');

const Utils = {
	createDir(path) {
		nodefs.mkdirSync(path, '0777', true);
	},
	saveFile(basePath, project, filename, file) {
		return new Promise((resolve, reject) => {
			if (!fs.existsSync(basePath)) {
				reject('ERRBPNE: base path does not exist');
			}
			const path = `/images/${project}`;
			const dir = `${basePath}/public${path}`;
      console.log("Uploading: " + filename + " to " + dir);
      try {
        Utils.createDir(dir);
			} catch (err) {
      	reject(err);
      }
      const filePath = `${dir}/${filename}`;
      file.mv(filePath, function (err) {
				if (err) {
					reject(err);
				} else {
					resolve(`${path}/${filename}`)
				}
			});
		})
	}
};

module.exports = Utils;