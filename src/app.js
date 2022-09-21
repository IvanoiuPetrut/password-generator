const inputPassword = document.getElementById("input--password");
const inputLength = document.getElementById("input--length");

const btnGenerate = document.getElementById("btn--generate");

const labelCharaterLength = document.getElementById("character-length");

let password = "";
let characterLength = 128;
let includeUppercase = true;
let includeLowercase = true;
let includeNumbers = true;
let includeSymbols = true;

btnGenerate.addEventListener("click", () => {
  generatePassword();
  inputPassword.value = password;
  console.log(password);
  console.log(password.length);
});

inputLength.addEventListener("input", (e) => {
  characterLength = e.target.value;
  labelCharaterLength.innerText = characterLength;
});

function generateCharacter() {
  let characters = "";
  if (includeUppercase) {
    characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  if (includeLowercase) {
    characters += "abcdefghijklmnopqrstuvwxyz";
  }
  if (includeNumbers) {
    characters += "0123456789";
  }
  if (includeSymbols) {
    characters += "!@#$%^&*()_+";
  }
  return characters.charAt(Math.floor(Math.random() * characters.length));
}

function generatePassword() {
  password = "";
  for (let i = 0; i < characterLength; i++) {
    password += generateCharacter();
  }
}
