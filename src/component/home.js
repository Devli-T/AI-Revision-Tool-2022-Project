import React from 'react';
import { API_TextSubmission } from '../config'; // Adjust the path as per your directory structure
import '../css/home.css';
import { sendPostRequest } from '../utils/apiUtils';

const Home = () => {
    const username = "TestPerson";      // TODO: Change when user accounts get implimented
    const subject = "TestSubject";      // TODO: Add in subject implimentation
    
    const submitText = async () => {
        var text = document.getElementById("textPrompt").value;

        sendPostRequest(API_TextSubmission, {
            username: username,
            subject: subject,
            text: text
        });
    };

    const uploadFile = (event) => {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            var text = e.target.result;

            console.log("Text given in file: " + text);

            if (!text) return;

            sendPostRequest(API_TextSubmission, {
                username: username,
                subject: subject,
                text: text
            })
        };
        reader.readAsText(file);

    };

    return (
        <div className="container">
            <h1>Text Upload Page</h1>
            <div className="text-container">
                <textarea id="textPrompt" rows="10" cols="50" placeholder="Enter your text here"></textarea>
                <button id="submitButton" className="btn_Submit" onClick={submitText}>Submit</button>
            </div>
            <div className="file-upload-container">
                <label className="file-upload-label" htmlFor="fileUpload1">Upload File</label>
                <label className="file-upload-label" htmlFor="fileUpload2">Upload File</label>
                <label className="file-upload-label" htmlFor="fileUpload3">Upload File</label>
                <input type="file" id="fileUpload1" accept=".txt" onChange={uploadFile} />
                <input type="file" id="fileUpload2" accept=".txt" onChange={uploadFile} />
                <input type="file" id="fileUpload3" accept=".txt" onChange={uploadFile} />
            </div>
        </div>
    );
};

export default Home;
