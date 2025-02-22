const minNum = 1;
const maxNum = 100;
const answer = Math.floor(Math.random() * (maxNum - minNum)) - minNum;
let running = true;
let guesses = 0;

while (running) {
    let guess = window.prompt(`Enter a number between ${minNum} - ${maxNum}:`)
    guess = Number(guess);

    while (isNaN(guess) || guess < minNum || guess > maxNum) {
        window.alert("Please enter a valid number.");
        guess = window.prompt(`Enter a number between ${minNum} - ${maxNum}:`)
        guess = Number(guess);
    }

    guesses++;
    if (guess === answer) {
        window.alert(`Correct! The answer is ${answer}. Number of Guesses: ${guesses}.`);
        running = false;
    }
    else {
        if (guess < answer) {
            window.alert(`${guess} is too low.`);
        }
        else if (guess > answer) {
            window.alert(`${guess} is too high.`);
        }
    }

}