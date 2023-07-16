const { spawn } = require('child_process');  // For running python programs etc

// Will run the python program with the fileName command line argument
function runPythonProgram(username, subject, fileName) {
    const pythonProcess = spawn('python3', ['../ExternalResources/pythonProj.py', username, subject, fileName]);    // to be changed later

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

module.exports = {
    runPythonProgram,
}