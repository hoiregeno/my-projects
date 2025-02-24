// Updated JavaScript to work with the HTML file

document.getElementById("passwordForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form from refreshing the page

    // Retrieve user inputs from the form
    const length = parseInt(document.getElementById("length").value);
    const includeLowercase = document.getElementById("includeLowercase").checked;
    const includeUppercase = document.getElementById("includeUppercase").checked;
    const includeNumbers = document.getElementById("includeNumbers").checked;
    const includeSymbols = document.getElementById("includeSymbols").checked;

    // Generate the password using the function.
    const password = generatePassword(length, includeLowercase, includeUppercase, includeNumbers, includeSymbols);

    // Display the generated password.
    document.getElementById("result").textContent = password;
});

function generatePassword(length, includeLowercase, includeUppercase, includeNumbers, includeSymbols) {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!#$%&_*+-";

    let allowChars = "";
    let password = "";

    allowChars += includeLowercase ? lowercaseChars : "";
    allowChars += includeUppercase ? uppercaseChars : "";
    allowChars += includeNumbers ? numberChars : "";
    allowChars += includeSymbols ? symbolChars : "";

    if (allowChars.length === 0) {
        return "(At least one character set must be selected.)";
    }

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allowChars.length);
        password += allowChars[randomIndex];
    }

    return password;
}