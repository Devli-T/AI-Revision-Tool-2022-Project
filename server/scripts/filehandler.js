const fs = require('fs');   // For file saving

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

module.exports = {
    saveFile
}