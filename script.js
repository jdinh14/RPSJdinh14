const startBtn = document.getElementById('startBtn');
const soundToggle = document.getElementById('soundToggle');
const avatarSelection = document.getElementById('avatarSelection');
const gameChoicesDiv = document.getElementById('gameChoices');
const gameArea = document.getElementById('gameArea');
const resetBtn = document.getElementById('resetBtn');
const avatars = document.querySelectorAll('.avatar');
const gameChoiceButtons = document.querySelectorAll('.gameChoice');
const userChoiceDiv = document.getElementById('userChoice');
const cpuChoiceDiv = document.getElementById('cpuChoice');
const playerScoreElem = document.getElementById('playerScore');
const cpuScoreElem = document.getElementById('cpuScore');
const avatarDisplayArea = document.getElementById('avatarDisplayArea');

let isMuted = false; 
let playerScore = 0;
let cpuScore = 0;
const gameChoices = ['rock', 'paper', 'scissors']; //array to hold choices
let audio = new Audio('ASSETS/sunhero.mp3');
audio.loop = true;

let userAvatar = ''; //empty var to will be filled. 
let cpuAvatar = '';

startBtn.addEventListener('click', function() { // Add a 'click' event listener to the 'startBtn' element
    startBtn.style.display = 'none';     // Hide the 'startBtn' when it's clicked
    avatarSelection.style.display = 'flex'; // toggles the next selection
    playMusic(); //toggles the music to start
    alert('Pick a Character!'); 
});

soundToggle.addEventListener('click', toggleMusic);

avatars.forEach(avatar => {
    avatar.addEventListener('click', function() {
        const userAvatar = this.dataset.avatar;
        userChoiceDiv.innerHTML = `<img src="ASSETS/${userAvatar}.png" class="avatar">`;
        const cpuAvatar = getRandomAvatar();
        cpuChoiceDiv.innerHTML = `<img src="ASSETS/${cpuAvatar}.png" class="avatar">`;

        
        document.getElementById('avatarDisplayArea').style.display = 'flex'; // Show the avatars using the container
        alert('The first to score 5 WINS!!!');

        
        avatarSelection.style.display = 'none'; // Hide avatar selection and shows the game
        gameChoicesDiv.style.display = 'flex';
    });
});

gameChoiceButtons.forEach(button => {
    button.addEventListener('click', function() {     // click event listener to each individual game choice button
        const userChoice = this.dataset.choice;         // Fetch the game choice (rock, paper, or scissors) from the clicked button's 'data-choice' attribute
        const cpuChoice = getRandomChoice();        // Randomly select a game choice for the CPU using the 'getRandomChoice' function
        gameChoicesDiv.style.display = 'none';
        gameArea.style.display = 'flex';
        resetBtn.style.display = 'block';
        evaluateGame(userChoice, cpuChoice);        // Evaluate the result based on the user's choice and the CPU's choice using the 'evaluateGame' function
    });
});

function refreshPage(){
    window.location.reload(); //refreshes page
} 


function playMusic() { // starts background music from the beginning
    audio.currentTime = 0; 
    audio.play();
    if (isMuted) {
        audio.muted = true;
    }
}

// function stopMusic() { // stop and reset the background music
//     audio.pause();
//     // audio.currentTime = 0; 
// }

function toggleMusic() { // Toggle the audio's muted state
    isMuted = !isMuted; // Invert the value of 'isMuted' (true becomes false, false becomes true) personal note: try using invert more for practice 
    audio.muted = isMuted;  // Set the audio's muted property to the value of 'isMuted'
}

function getRandomChoice() { // Picks a random choice from the 'gameChoices' array
    const index = Math.floor(Math.random() * gameChoices.length);
    return gameChoices[index]; // Return thechoice at the random index
}

function getRandomAvatar() { // Get a random avatar from a predefined list
    const avatars = ['bun0', 'bun1', 'cat1', 'cat2', 'dog1', 'dog2'];
    const index = Math.floor(Math.random() * avatars.length);
    return avatars[index]; // Return the avatar
}

function evaluateGame(userChoice, cpuChoice) {
    if (userChoice === cpuChoice) {
        alert('Its a tie!');
        
    } else if (
        (userChoice === 'rock' && cpuChoice === 'scissors') ||
        (userChoice === 'paper' && cpuChoice === 'rock') ||
        (userChoice === 'scissors' && cpuChoice === 'paper')
    ) {
        playerScore++;
        alert('You win this round! You picked ' + userChoice + ' which beats ' + cpuChoice);
    } else {
        cpuScore++;
        alert('CPU wins this round! They used ' + cpuChoice + ' which beats ' + userChoice);
    }
    updateScore();

    
    
    gameChoicesDiv.style.display = 'flex';     // Show the game choice buttons again and hide the game area
    gameArea.style.display = 'none';
}

function updateScore() {
    playerScoreElem.textContent = playerScore;  // Display the current scores of the player and CPU
    cpuScoreElem.textContent = cpuScore;

    if (playerScore === 5 || cpuScore === 5) {     // Check who has reached a score of 5
        gameChoicesDiv.style.display = 'none';
        setTimeout(() => {
            alert(playerScore === 5 ? 'You win the game!' : 'CPU wins the game!');
            refreshPage();
        }, 5);
    }
}

