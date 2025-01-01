import { questions, questionsContainer, quiz } from "./index.js";

export default class Question {
    constructor(index) {
        this.theQuestion = questions[index].question;
        this.category = questions[index].category;
        this.answer = questions[index].correct_answer;
        this.wrongAnswers = questions[index].incorrect_answers;
        this.index = index;
        this.allAnswers = this.getChoicesReady();
        this.isAnswered = false;
    }
    getChoicesReady() {
        return this.wrongAnswers.concat(this.answer).sort();
    }

    displayQuestions() {
        const theQuestion = `
        <div class="col-md-10 col-lg-7 m-auto">
            <div>
                <div class="col-9 col-md-5 text-center m-auto mb-4 text-dark heading animate__headShake">
                    <h1 class="py-2 bg-white mb-0">
                        Quiz App</h1>
                </div>
                <div class="bg-light questionContainer animate__animated animate__bounceIn rounded p-4 pb-2">
                    <div class="head-box d-flex justify-content-between align-items-center">
                        <div class='me-3'>
                            <span id="categoryBtn" class="btn text-light">${this.category}</span>
                        </div>
                        <div>
                            <span id="" class="btn text-light btn-color">
                                <span id="currentQuestion">${this.index + 1}</span> Of <span
                                    id="totalNumberOfQuestions">${questions.length}</span> Question
                            </span>
                        </div>
                    </div>
                    <div class="box-body">
                        <h3 class="question py-3 text-center">${this.theQuestion}</h3>
                        <ul class="row list-unstyled text-center">
                            ${this.allAnswers.map((element) => {
            return `<div class="col-md-6 p-1">
                            <li class="py-2 mb-2 fw-bold rowAnswers">${element}</li>
                    </div>`}).join('')} 
                        </ul>
                        <div class="d-flex align-items-center justify-content-center the-main-color">
                            <i class="fa-regular fa-face-laugh-beam fa-2xl me-1"></i>
                            <span class="h3 theScore">Score: ${quiz.score}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
        questionsContainer.innerHTML = theQuestion;
        const allAnswers = document.querySelectorAll('.box-body ul li');
        for (let i = 0; i < allAnswers.length; i++) {
            allAnswers[i].addEventListener('click', (e) => {
                this.checkAnswer(e)
            })
        }
    }
    checkAnswer(e) {
        if (!this.isAnswered) {
            if (e.target.innerHTML === this.answer) {
                e.target.classList.add('correct', 'animate__animated', 'animate__bounceIn')
                quiz.score += 1;
            }
            else {
                e.target.classList.add('wrong', 'animate__animated', 'animate__shakeX')
            }
            this.animateQuestion(e.target, 500)
            this.isAnswered = true;
        }
    }
    animateQuestion(element, duration) {
        setTimeout(() => {
            element.closest('.questionContainer').classList.replace('animate__bounceIn', 'animate__fadeOutLeft')
            setTimeout(() => {
                this.nextQuestion()
            }, duration);
        }, duration);
    }
    nextQuestion() {
        this.index += 1;
        if (this.index > questions.length - 1) {
            questionsContainer.innerHTML = quiz.endQuiz()
            const tryAgainBtn = document.querySelector('.tryAgain').addEventListener('click', function () {
                location.reload()
            })
            return;
        }
        else {
            const newQuestion = new Question(this.index)
            newQuestion.displayQuestions();
        }
    }
}