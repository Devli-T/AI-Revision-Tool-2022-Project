const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
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

    res.status(200).end();
});

app.post('/getQuestionCount', async (req, res) => {
    const { username, subject } = req.body;

    console.log('User ' + username + ' requested subject ' + subject + ' question count');
    let answer = await database.getQuestionCount(username, subject);
    console.log("Got an answer of ", answer);

    if (answer) {
        res.status(200).json({ count: answer }).end();
        return;
    }
    console.error("Was unable to get the question count for " + username + " + " + subject);
    res.status(500).end();
});

// gets the question given username, subject and question number.
app.post('/getQuestion', (req, res) => {
    const { username, subject, questionNumber } = req.body;

    console.log('User ' + username + ' requested subject ' + subject + ' question ' + questionNumber);

    database.getData(username, subject, questionNumber).then((row) => {
        if (row) {
            const question = row.question;
            const answer = row.answer;
            res.status(200).json({ question: question, answer: answer }).end();
        }
        console.error("row did not exist");
        res.status(500).end();
    }).catch(error => {
        console.error(error);
        res.status(500).end();
    })
});




app.listen(5000, () => {
    console.log('API server is running on port 5000');
});

