const express = require('express');
const busboy = require('connect-busboy');
const cors = require('cors');

const Utils = require('./utils');

const app = express();

app.use(cors());
app.use(busboy());
app.post('/images/:project', (req, res) => {
	const projectName = req.params.project;
	req.pipe(req.busboy);
	req.busboy.on('file', function (fieldname, file, filename) {
		res.setHeader('Content-Type', 'application/json');
		Utils.saveFile(projectName, filename, file)
			.then((url) => {
				res.send(JSON.stringify({url}));
			})
			.catch((err) => {
				console.log(err);
				res.status(500);
				res.send(JSON.stringify({error: err}));
			});
	});
});

app.use(express.static('public'));

app.listen(process.env.PORT || 3000);