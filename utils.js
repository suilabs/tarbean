const fs = require('fs');

const Utils = {
	createDir(path) {
		if(!fs.existsSync(path)) {
			fs.mkdirSync(path);
		}
	},
	saveFile(project, filename, file) {
		return new Promise((resolve, reject) => {
			console.log("Uploading: " + filename);
			const path = `/images/${project}`;
			const dir = `${__dirname}/public${path}`;
			Utils.createDir(dir);
			const filePath = `${dir}/${filename}`;
			const fstream = fs.createWriteStream(filePath);
			fstream.on('open', () => {
				file.pipe(fstream);
			});
			fstream.on('close', () => resolve(`${path}/${filename}`));
			fstream.on('error', reject);
		})
	}
};

module.exports = Utils;