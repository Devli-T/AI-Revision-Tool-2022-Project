import React from 'react';
import Card from './card';

function ViewQuiz() {
    function generateCard(){
        return <Card questionText={getQuestionText()} answerText={getAnswerText()} />
    }

    function getQuestionText() {
        return "test question text";
    }
    function getAnswerText() {
        return "test answer text";
    }


    return (<div>
        {generateCard()}
    </div>)
}
export default ViewQuiz;