const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');   // For file saving
const { spawn } = require('child_process');  // For running python programs etc
const cors = require('cors');

const app = express();

// Configure CORS to allow requests only from http://localhost:3000
const corsOptions = {
  origin: 'http://localhost:3000',
};
app.use(cors(corsOptions));

app.use(bodyParser.json());


// Saves a file
function saveFile(fileName, text) {
    fs.writeFile(fileName, text, (err) => {
        if (err) {
            console.error('Error saving text to file:', err);
            res.status(500).json({ message: 'Failed to save text to file' }).end();
            return;
        }
        console.log('Text saved to file:', fileName);
    });
}

// Will run the python program with the fileName command line argument
function runPythonProgram(username, subject, fileName) {
    const pythonProcess = spawn('python', ['../ExternalResources/pythonProj.py', username, subject, fileName]);    // to be changed later

    pythonProcess.stdout.on('data', (data) => {
        console.log(`Python program stdout: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python program stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`Python program exited with code ${code}`);
    });
}


app.post('/textSubmission', (req, res) => {
    const { username, subject, text } = req.body;
    // TODO: Add in checks to make sure the text / username / subject is ok

    console.log('Received username:', username);
    console.log('Received text:', text);
    console.log('Received subject:', subject);

    const fileName = './UserGivenInfo/' + username + ".txt";

    saveFile(fileName, text);

    runPythonProgram(username, subject, fileName);

    res.status(200).json({ message: 'Text submitted successfully' }).end();
});


app.listen(5000, () => {
    console.log('API server is running on port 5000');
});