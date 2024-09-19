export class BalloonGame {
    constructor({ balloonCount, balloonContainerId, messageId, audioSrc }) {
        this.popped = 0;
        this.balloonCount = balloonCount;
        this.balloonContainer = document.getElementById(balloonContainerId);
        this.messageElement = document.getElementById(messageId);
        this.brightColors = ['#FF5733', '#FFC300', '#DAF7A6', '#FF33FF', '#33FF57', '#33C1FF', '#C70039']; // Predefined bright colors
        this.audioSrc = audioSrc; // Array of audio files
        this.audioElements = this.audioSrc.map(src => new Audio(src)); // Create Audio objects for each file
    }

    init() {
        this.renderBalloons();
        this.attachEventListeners();
    }

    // Generates a random color from the brightColors array
    getRandomColor() {
        const randomIndex = Math.floor(Math.random() * this.brightColors.length);
        return this.brightColors[randomIndex];
    }

    // Renders the balloon divs dynamically with random colors
    renderBalloons() {
        for (let i = 0; i < this.balloonCount; i++) {
            const balloon = document.createElement('div');
            balloon.classList.add('balloon');
            balloon.style.backgroundColor = this.getRandomColor(); // Assign random color
            this.balloonContainer.appendChild(balloon);
        }
    }

    // Attaches the event listeners for popping balloons
    attachEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('balloon')) {
                this.popBalloon(e.target);
            }
        });
    }

    // Handles balloon pop action
    popBalloon(balloon) {
        balloon.style.backgroundColor = '#ededed';
        balloon.textContent = 'POP!';
        this.popped++;
        this.playRandomSound(); // Play random burst sound
        balloon.removeEventListener('mouseover', this.popBalloon);
        this.checkAllPopped();
    }

    // Plays a random sound from the audio array
    playRandomSound() {
        const randomIndex = Math.floor(Math.random() * this.audioElements.length);
        this.audioElements[randomIndex].play(); // Play the randomly selected audio
    }

    // Checks if all balloons have been popped
    checkAllPopped() {
        if (this.popped === this.balloonCount) {
            this.displaySuccessMessage();
        }
    }

    // Displays the success message and clears the gallery
    displaySuccessMessage() {
        this.balloonContainer.innerHTML = '';
        this.messageElement.style.display = 'block';
    }
}
