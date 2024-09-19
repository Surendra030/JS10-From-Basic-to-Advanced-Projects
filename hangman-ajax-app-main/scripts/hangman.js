class Hangman {
    constructor(word, remainingGuesses){
        this.word = word.toLowerCase().split('');
        this.remainingGuesses = remainingGuesses;
        this.guessedLetters = [];
        this.status = 'playing';
    }

    get puzzle() {
        let puzzle = '';
        this.word.forEach((letter) => {
        if (this.guessedLetters.includes(letter) || letter === ' '){
            puzzle += letter;
        } else {
            puzzle += '*'
        }
        })
        return puzzle;
    }

    
    
    constructor(word, remainingGuesses) {
        this.word = word.toLowerCase().split('');
        this.remainingGuesses = remainingGuesses;
        this.guessedLetters = [];
        this.incorrectGuesses = []; // Track incorrect guesses
        this.status = 'playing';
    }

    makeGuess(guess) {
        // Same as before

        if (isUnique && isBadGuess) {
            this.incorrectGuesses.push(guess); // Record incorrect guess
        }
        this.calculateStatus();
    }

    get statusMessage() {
        if (this.status === 'playing') {
            return `Guesses left: ${this.remainingGuesses}`;
        } else if (this.status === 'failed') {
            return `Nice try! The word was "${this.word.join('')}". Incorrect guesses: ${this.incorrectGuesses.join(', ')}`;
        } else {
            return 'Great work! You guessed the word!';
        }
    }

}




