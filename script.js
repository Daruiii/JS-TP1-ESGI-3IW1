const app = document.getElementById('app');

const quizEsport = [
    {
        question: "Quel est le pourcentage de défaites des Gentle Mates en 2025 ?",
        answers: ["42%", "58%", "73%", "Ils ont abandonné la compétition"],
        correct: 2
    },
    {
        question: "Depuis quand Vitality n'a pas battu la Karmine Corp sur Rocket League ?",
        answers: ["Depuis 2022", "Depuis 2023", "Depuis 2024", "Jamais battue"],
        correct: 1
    },
    {
        question: "Quel est le rôle de Caliste chez KC ?",
        answers: ["Toplaner", "ADC", "Midlaner", "Coach"],
        correct: 1
    },
    {
        question: "Quelle équipe a la fanbase la plus bruyante de France ?",
        answers: ["Aegis", "Solary", "Vitality", "Karmine Corp"],
        correct: 3
    },
    {
        question: "Qui est surnommé \"my CEO\" chez KC ?",
        answers: ["Prime", "Kameto", "Arthur", "Kotei"],
        correct: 1
    }
];

const quizEchecs = [
    {
        question: "Quel pièce peut se déplacer en L ?",
        answers: ["Le cavalier", "La tour", "Le fou", "Le roi"],
        correct: 0
    },
    {
        question: "Combien y a-t-il de cases sur un échiquier ?",
        answers: ["64", "100", "81", "72"],
        correct: 0
    },
    {
        question: "Quelle pièce ne peut jamais reculer ?",
        answers: ["Le pion", "La tour", "La dame", "Le roi"],
        correct: 0
    },
    {
        question: "Comment appelle-t-on une partie sans gagnant ?",
        answers: ["Un pat", "Une remise", "Un nul", "Toutes ces réponses"],
        correct: 3
    },
    {
        question: "Quel est le nom du champion du monde en 2024 ?",
        answers: ["Carlsen", "Ding Liren", "Nepomniachtchi", "Kasparov"],
        correct: 1
    }
];

let currentQuiz = [];
let currentQuestion = 0;
let score = 0;

function showHome() {
    app.innerHTML = `
    <h1>Bienvenue sur le quiz !</h1>
    <p>Choisis ton thème :</p>
    <button onclick="startQuiz('esport')">Esport France</button>
    <button onclick="startQuiz('echecs')">Echecs</button>
  `;
}

function startQuiz(theme) {
    currentQuiz = theme === "esport" ? quizEsport : quizEchecs;
    currentQuestion = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    const q = currentQuiz[currentQuestion];
    app.innerHTML = `
    <h2>${q.question}</h2>
    <div id="answers"></div>
    <div>
        <button id="nextBtn">Suivant</button>
        <button id="quitBtn">Quitter</button>
    </div>
    <div id="progressBarContainer">
        <div id="progressBar" style="width: ${(currentQuestion / currentQuiz.length) * 100}%;"></div>
    </div>

  `;

    const answersDiv = document.getElementById('answers');
    q.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.textContent = answer;
        btn.addEventListener('click', () => selectAnswer(index));
        answersDiv.appendChild(btn);
    });
    document.getElementById('quitBtn').addEventListener('click', showHome);
    document.getElementById('nextBtn').addEventListener('click', () => {
        if (currentQuestion < currentQuiz.length - 1) {
            currentQuestion++;
            showQuestion();
        } else {
            showResults();
        }
    });
}

function selectAnswer(index) {
    const q = currentQuiz[currentQuestion];
    const allButtons = document.querySelectorAll('#answers button');
    allButtons.forEach((btn, i) => {
        btn.style.backgroundColor = i === q.correct ? 'green' : (i === index ? 'red' : '');
        btn.disabled = true;
    });
    if (index === q.correct) score++;
}

function showResults() {
    app.innerHTML = `
    <h2>Quiz terminé !</h2>
    <p>Ton score : ${score} / ${currentQuiz.length}</p>
    <button onclick="showHome()">Retourner à l'accueil</button>
  `;
}

showHome();