const word = document.getElementById('word');

const text = document.getElementById('text')

const scoreEl = document.getElementById('score');

const timeEl = document.getElementById('time');

const endgameEl = document.getElementById('end-game-container');

const settingsBtn = document.getElementById('settings-btn');

const settings = document.getElementById('settings');

const settingsForm = document.getElementById('settings-form');

const difficultySelect = document.getElementById('difficulty')

//list of words for game
const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
];

//init word
let randomWord;

//init score
let score = 0;

//init time
let time = 10;

//set difficulty to value in local storage
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

//set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

//focus on text on start
text.focus();

//focus on text on start
const timeInterval = setInterval(updateTime, 1000);

//generate random word from array
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

//add word to DOM
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

addWordToDOM();

//update score
function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

//update time
function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';

    if (time === 0) {
        clearInterval(timeInterval);
        //end game
        gameOver();
    }
}

//game over, show end screen
function gameOver() {
    endgameEl.innerHTML = `
    <h1>Time ran out!</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
    `;

    endgameEl.style.display = 'flex';
}

//event listeners
text.addEventListener('input', e => {
    const insertedText = e.target.value;
    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();

        //clear input
        e.target.value = '';

        if (difficulty === 'hard') {
            time += 3;
        }else if (difficulty === 'medium') {
            time += 6;
        } else {
            time += 9;
        }
        
        updateTime();
    }
})

//settings brn click
settingsBtn.addEventListener('click', () => {
    settings.classList.toggle('hide')
});

//set difficulty level
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;

    localStorage.setItem('difficulty', difficulty);
});