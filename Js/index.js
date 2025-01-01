import Question from './question.module.js';
import { Quiz } from './quiz.module.js';
const categoryMenu = document.getElementById('categoryMenu');
const difficultyMenu = document.getElementById('difficultyMenu');
const numberOfQuestions = document.getElementById('numberOfQuestions');
const startBtn = document.getElementById('startBtn');
const quizPage = document.getElementById('quizPage');
const questionPage = document.getElementById('questionPage');
export const questionsContainer = document.getElementById('allQuestions')
export let quiz;
export let questions;

startBtn.addEventListener('click', async function () {
    if (numberOfQuestions.value < 1) {
        return;
    }
    else {
        const category = categoryMenu.value;
        const difficulty = difficultyMenu.value;
        const questionNumbers = numberOfQuestions.value;
        quiz = new Quiz(category, difficulty, questionNumbers)
        questions = await quiz.getQuestions();
        const question = new Question(0);
        quizPage.classList.add('d-none');
        questionPage.classList.remove('d-none');
        question.displayQuestions();
        question.displayQuestions();
    }
});