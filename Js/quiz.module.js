export class Quiz {
    constructor(category, difficulty, numberOfQuestions) {
        this.category = category;
        this.difficulty = difficulty;
        this.numberOfQuestions = numberOfQuestions;
        this.score = 0;
        this.finalPage = document.getElementById('finalPage');
    }
    async getQuestions() {
        const response = await fetch(`https://opentdb.com/api.php?amount=${this.numberOfQuestions}&category=${this.category}&difficulty=${this.difficulty}`);
        const data = await response.json();
        return data.results;
    }
    endQuiz() {
        return `
        <div class='animate__animated animate__bounceIn col-md-10 col-lg-7 m-auto'>
            <div class="col-10 col-md-5 text-center m-auto mb-4 text-dark heading">
                <h1 class="py-2 bg-white mb-0">
                   Quiz App
                </h1>
            </div>
            <div class="bg-light rounded text-center p-4">
                <h3 class="theFinalScore">
                ${this.score == this.numberOfQuestions ?
                `Congratulations 🎉`
                :
                `Your Score Is: ${this.score}`}
                </h3>
                <button class="btn btn-primary tryAgain m-auto rounded-5 d-flex align-items-center">
                    <i class="fa-solid fa-arrows-rotate me-1"></i>Try Again
                </button>
            </div>
        </div>
        `
    }
}