const { API_URL } = require("../config");

const API_TextSubmission = API_URL + "textSubmission";
const API_GetQuestion = API_URL + "getQuestion";
const API_GetQuestionCount = API_URL + "getQuestionCount";

async function sendPostRequest(endpoint, body) {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error occurred during request:', error);
    }
}

async function API_getQuestionsCount(username, subject) {
    let a = await sendPostRequest(API_GetQuestionCount,
        {
            username: username,
            subject: subject
        });
    return a.count;
}

async function API_getQuestion(username, subject, questionNumber) {
    return await sendPostRequest(API_GetQuestion,
        {
            username: username,
            subject: subject,
            questionNumber: questionNumber
        });
}

async function API_submitText(username, subject, text) {
    return await sendPostRequest(API_TextSubmission,
        {
            username: username,
            subject: subject, 
            text: text
        })
}


module.exports = {
    API_getQuestionsCount,
    API_getQuestion,
    API_submitText

}