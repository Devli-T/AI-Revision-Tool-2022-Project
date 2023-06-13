import React, { useState, useEffect } from 'react';
import Card from './card';
import { API_GetQuestion, API_GetQuestionCount } from '../config';
import { sendPostRequest } from '../utils/apiUtils';

function ViewQuiz() {
    const username = "TestPerson";      // TODO: Change when user accounts get implimented
    const subject = "TestSubject";      // TODO: Add in subject implimentation

    const [cardData, setCardData] = useState(null); // State to hold the card data

    useEffect(() => {
        generateCard(); // Generate the card when the component mounts
    }, []); // Empty dependency array to run the effect only once


    async function getQuestionCount(username, subject) {
        let count = await sendPostRequest(API_GetQuestionCount, {
            username: username,
            subject: subject
        });
        console.log("count in getQuestionCount is " + count);
        console.log(count.count);
        if (!count) console.error("Failed to get the question count for", username, "+", subject);
        return count;
    }

    async function getQuestion(username, subject, questionNumber) {
        let questionAndAnswer = await sendPostRequest(API_GetQuestion, {
            username: username,
            subject: subject,
            questionNumber: questionNumber
        });
        return questionAndAnswer ?? { question: "Failed to load question", answer: "Failed to load answer" };
    }

    async function generateCard() {
        let count = parseInt(await getQuestionCount(username, subject));
        let id = Math.floor(Math.random() * count);
        console.log("Going for id " + id + " for " + username + " " + subject + " count was " + count);
        let qna = await getQuestion(username, subject, id);
        setCardData(qna);
        return <Card questionText={qna.question} answerText={qna.answer} />
    }

    function getCard() {
        return cardData && <Card questionText={cardData.question} answerText={cardData.answer} />
    }

    return (<div>
        {getCard()}
    </div>)
}
export default ViewQuiz;