const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const database = require('./scripts/database');
const pythonHandler = require('./scripts/pythonHandler');
const fileHandler = require('./scripts/filehandler')

const app = express();

// Configure CORS to allow requests only from http://localhost:3000
const corsOptions = {
    origin: 'http://localhost:3000',
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.post('/textSubmission', (req, res) => {
    const { username, subject, text } = req.body;
    // TODO: Add in checks to make sure the text / username / subject is ok

    console.log('Received username:', username);
    console.log('Received text:', text);
    console.log('Received subject:', subject);

    const fileName = './UserGivenInfo/' + username + ".txt";

    fileHandler.saveFile(fileName, text);
    pythonHandler.runPythonProgram(username, subject, fileName);

    res.status(200).json({ message: 'Text submitted successfully' }).end();
});




app.listen(5000, () => {
    console.log('API server is running on port 5000');
});

