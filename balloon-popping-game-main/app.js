import { BalloonGame } from './balloonGame.js';

document.addEventListener('DOMContentLoaded', () => {
    const game = new BalloonGame({
        balloonCount: 15,
        balloonContainerId: 'balloon-gallery',
        messageId: 'yay-no-balloons',
        audioSrc: ['pop2.mp3'] // Paths to your audio files
    });
    game.init();
});
